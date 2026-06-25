import { useState, type FormEvent } from 'react';
import { FileText, Pencil, Plus, Trash2, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';
import type { CmsContentType, PublicationItem } from '../types/content';

type Values = Record<string, string | boolean>;
type Field = { name: string; label: string; type?: string; required?: boolean; accept?: string; options?: string[] };
const slugify = (v: string) => v.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const today = () => new Date().toISOString().slice(0, 10);

const config: Record<CmsContentType, { title: string; help: string; fields: Field[] }> = {
  news: { title: 'News & Featured Stories', help: 'The image and source document are stored with this story, so they stay correctly paired everywhere.', fields: [
    {name:'title',label:'Headline',required:true},{name:'category',label:'Category',required:true},{name:'author',label:'Author'},{name:'publishedAt',label:'Publication date',type:'date',required:true},
    {name:'summary',label:'Summary',type:'textarea',required:true},{name:'content',label:'Article body (blank line between paragraphs)',type:'textarea',required:true},{name:'imageAlt',label:'Image description',required:true},
    {name:'image',label:'Featured image',type:'file',accept:'image/*',required:true},{name:'sourceFileUrl',label:'Source document',type:'file',accept:'.pdf,.doc,.docx'}]},
  event: { title: 'Events', help: 'End dates automatically determine upcoming or past placement. Flyer and links belong to this event record.', fields: [
    {name:'title',label:'Event title',required:true},{name:'startDate',label:'Start date',type:'date',required:true},{name:'endDate',label:'End date',type:'date'},{name:'time',label:'Time'},
    {name:'location',label:'Location',required:true},{name:'format',label:'Format'},{name:'description',label:'Description',type:'textarea',required:true},{name:'fee',label:'Fee'},
    {name:'contactEmail',label:'Contact email',type:'email'},{name:'contactPhones',label:'Phone numbers, comma separated'},{name:'actionUrl',label:'Registration / meeting URL',type:'url'},{name:'actionLabel',label:'Link button label'},
    {name:'flyerUrl',label:'Event flyer',type:'file',accept:'image/*'},{name:'sourceFileUrl',label:'Programme/source file',type:'file',accept:'.pdf,.doc,.docx'}]},
  gallery: { title: 'Gallery & Media', help: 'Assign every photo to an album/event while uploading to prevent unrelated images being mixed.', fields: [
    {name:'title',label:'Photo title',required:true},{name:'album',label:'Album / event name',required:true},{name:'eventDate',label:'Event date',type:'date'},{name:'location',label:'Location'},
    {name:'imageAlt',label:'Image description',required:true},{name:'imageUrl',label:'Photo',type:'file',accept:'image/*',required:true}]},
  seminar: { title: 'Seminar Series', help: 'Seminars are grouped into the current year, two prior years, and the archive from their date.', fields: [
    {name:'title',label:'Seminar title',required:true},{name:'presenter',label:'Presenter',required:true},{name:'seminarDate',label:'Seminar date',type:'date',required:true},{name:'summary',label:'Summary',type:'textarea'},
    {name:'registrationUrl',label:'Registration URL',type:'url'},{name:'meetingUrl',label:'Meeting URL',type:'url'},{name:'presentationUrl',label:'Presentation/paper',type:'file',accept:'.pdf,.ppt,.pptx,.doc,.docx'},
    {name:'videoUrl',label:'Recording URL',type:'url'},{name:'imageUrl',label:'Webinar image',type:'file',accept:'image/*'}]},
  publication: { title: 'Publications', help: 'Manage policy briefs, technical reports, newsletters, and other knowledge products.', fields: [
    {name:'title',label:'Publication title',required:true},{name:'type',label:'Type',type:'select',options:['policy-brief','technical-report','newsletter','other'],required:true},{name:'year',label:'Year',type:'number',required:true},
    {name:'author',label:'Author(s)'},{name:'summary',label:'Summary',type:'textarea',required:true},{name:'fileUrl',label:'Publication file',type:'file',accept:'.pdf,.doc,.docx',required:true},{name:'coverImageUrl',label:'Cover image',type:'file',accept:'image/*'}]},
};

async function upload(file: File, type: CmsContentType, id: string) {
  if (!supabase) return await new Promise<string>((resolve, reject) => { const r = new FileReader(); r.onload=()=>resolve(String(r.result)); r.onerror=reject; r.readAsDataURL(file); });
  const name = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-');
  const path = `${type}/${new Date().getFullYear()}/${id}/${Date.now()}-${name}`;
  const { error } = await supabase.storage.from('content-media').upload(path, file);
  if (error) throw error;
  return supabase.storage.from('content-media').getPublicUrl(path).data.publicUrl;
}

export function CmsManager({ type }: { type: CmsContentType }) {
  const data = useData(); const c = config[type];
  const collections: any = {news:data.news,event:data.events,gallery:data.gallery,seminar:data.seminars,publication:data.publications};
  const removers: any = {news:data.removeNews,event:data.removeEvent,gallery:data.removeGalleryImage,seminar:data.removeSeminar,publication:data.removePublication};
  const initial = () => ({status:'published',featured:false,publishedAt:today(),format:'Hybrid',actionLabel:'Register / Join Event',type:'policy-brief',year:String(new Date().getFullYear())});
  const [values,setValues]=useState<Values>(initial); const [files,setFiles]=useState<Record<string,File>>({}); const [editing,setEditing]=useState<string|null>(null); const [saving,setSaving]=useState(false); const [message,setMessage]=useState('');
  const reset=()=>{setValues(initial());setFiles({});setEditing(null)};
  const edit=(item:any)=>{const v:Values={};Object.entries(item).forEach(([k,x])=>v[k]=Array.isArray(x)?x.join(', '):typeof x==='boolean'?x:String(x??''));setValues(v);setEditing(item.id);window.scrollTo({top:0,behavior:'smooth'})};

  async function submit(e:FormEvent){e.preventDefault();setSaving(true);setMessage('');try{
    const id=editing??`${type}-${slugify(String(values.title))}-${Date.now()}`;const media:Record<string,string>={};for(const [k,f] of Object.entries(files) as [string, File][])media[k]=await upload(f,type,id);
    const common={id,title:String(values.title),status:String(values.status) as 'draft'|'published',featured:Boolean(values.featured),publishedAt:String(values.publishedAt||values.seminarDate||values.startDate||today())};
    if(type==='news')await data.saveNews({...common,slug:slugify(String(values.title)),category:String(values.category),author:String(values.author||'')||undefined,summary:String(values.summary),content:String(values.content).split(/\n\s*\n/).filter(Boolean),image:media.image||String(values.image||''),imageAlt:String(values.imageAlt),sourceFileUrl:media.sourceFileUrl||String(values.sourceFileUrl||'')||undefined});
    if(type==='event'){const date=String(values.startDate)+(values.endDate?` to ${values.endDate}`:'');await data.saveEvent({...common,slug:slugify(String(values.title)),startDate:String(values.startDate),endDate:String(values.endDate||'')||undefined,displayDate:date,date,time:String(values.time||'')||undefined,description:String(values.description),location:String(values.location),format:String(values.format||'Hybrid'),flyerUrl:media.flyerUrl||String(values.flyerUrl||'')||undefined,fee:String(values.fee||'')||undefined,contactEmail:String(values.contactEmail||'')||undefined,contactPhones:String(values.contactPhones||'').split(',').map(x=>x.trim()).filter(Boolean),actionUrl:String(values.actionUrl||'')||undefined,actionLabel:String(values.actionLabel||'')||undefined,sourceFileUrl:media.sourceFileUrl||String(values.sourceFileUrl||'')||undefined})}
    if(type==='gallery'){const imageUrl=media.imageUrl||String(values.imageUrl||'');await data.saveGalleryItem({...common,imageUrl,url:imageUrl,imageAlt:String(values.imageAlt),album:String(values.album),eventDate:String(values.eventDate||'')||undefined,location:String(values.location||'')||undefined})}
    if(type==='seminar')await data.saveSeminar({...common,presenter:String(values.presenter),seminarDate:String(values.seminarDate),year:new Date(String(values.seminarDate)).getFullYear(),summary:String(values.summary||'')||undefined,registrationUrl:String(values.registrationUrl||'')||undefined,meetingUrl:String(values.meetingUrl||'')||undefined,presentationUrl:media.presentationUrl||String(values.presentationUrl||'')||undefined,videoUrl:String(values.videoUrl||'')||undefined,imageUrl:media.imageUrl||String(values.imageUrl||'')||undefined});
    if(type==='publication')await data.savePublication({...common,type:String(values.type) as PublicationItem['type'],year:Number(values.year),author:String(values.author||'')||undefined,summary:String(values.summary),fileUrl:media.fileUrl||String(values.fileUrl||'')||undefined,coverImageUrl:media.coverImageUrl||String(values.coverImageUrl||'')||undefined});
    setMessage('Saved. The public site now uses this record and its attached media.');reset();
  }catch(err){setMessage(err instanceof Error?err.message:'Unable to save.')}finally{setSaving(false)}}

  return <div className="space-y-8"><section className="rounded-xl border border-slate-200 bg-white p-6 lg:p-8"><h2 className="text-2xl font-serif">{editing?'Edit':'Add'} {c.title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{c.help}</p>
    <form onSubmit={submit} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">{c.fields.map(f=><Input key={f.name} f={f} value={values[f.name]} onValue={x=>setValues(v=>({...v,[f.name]:x}))} onFile={x=>setFiles(v=>({...v,[f.name]:x}))}/>) }
      <label className="flex items-center gap-3 rounded-lg border p-4 text-sm"><input type="checkbox" checked={Boolean(values.featured)} onChange={e=>setValues(v=>({...v,featured:e.target.checked}))}/> Feature on homepage/key pages</label>
      <label className="text-xs font-bold uppercase tracking-wider">Status<select value={String(values.status)} onChange={e=>setValues(v=>({...v,status:e.target.value}))} className="mt-2 w-full rounded-lg border px-4 py-3 text-sm font-normal normal-case"><option value="published">Published</option><option value="draft">Draft</option></select></label>
      <div className="md:col-span-2 flex flex-wrap items-center gap-3"><button disabled={saving} className="inline-flex items-center rounded-lg bg-emerald-700 px-6 py-3 text-xs font-bold uppercase text-white"><Plus className="mr-2 h-4 w-4"/>{saving?'Saving…':editing?'Update entry':'Publish entry'}</button>{editing&&<button type="button" onClick={reset} className="rounded-lg border px-6 py-3 text-xs font-bold uppercase">Cancel</button>}<span className="text-sm text-slate-600">{message}</span></div></form></section>
    <section><h2 className="mb-4 text-xl font-serif">Managed entries ({collections[type].length})</h2><div className="grid gap-4 lg:grid-cols-2">{collections[type].map((item:any)=><article key={item.id} className="flex gap-4 rounded-xl border bg-white p-5">{item.image||item.imageUrl||item.flyerUrl||item.coverImageUrl?<img src={item.image||item.imageUrl||item.flyerUrl||item.coverImageUrl} alt="" className="h-24 w-24 rounded-lg object-cover"/>:<div className="flex h-24 w-24 items-center justify-center bg-slate-100"><FileText/></div>}<div className="min-w-0 flex-1"><div className="text-[10px] font-bold uppercase text-emerald-700">{item.status}{item.featured?' • Featured':''}</div><h3 className="mt-2 line-clamp-2 font-serif">{item.title}</h3><div className="mt-4 flex gap-2"><button onClick={()=>edit(item)} className="inline-flex items-center rounded border px-3 py-2 text-xs"><Pencil className="mr-1 h-3 w-3"/>Edit</button><button onClick={()=>confirm('Delete this entry?')&&removers[type](item.id)} className="inline-flex items-center rounded border border-red-200 px-3 py-2 text-xs text-red-700"><Trash2 className="mr-1 h-3 w-3"/>Delete</button></div></div></article>)}</div></section></div>;
}

function Input({f,value,onValue,onFile}:{key?:string;f:Field;value:string|boolean|undefined;onValue(x:string):void;onFile(x:File):void}){const cls='mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-normal normal-case';return <label className={`text-xs font-bold uppercase tracking-wider ${f.type==='textarea'?'md:col-span-2':''}`}>{f.label}{f.type==='textarea'?<textarea required={f.required} value={String(value||'')} onChange={e=>onValue(e.target.value)} className={`${cls} min-h-28`}/>:f.type==='select'?<select required={f.required} value={String(value||'')} onChange={e=>onValue(e.target.value)} className={cls}>{f.options?.map(x=><option key={x}>{x}</option>)}</select>:f.type==='file'?<span className="mt-2 block rounded-lg border border-dashed bg-slate-50 p-4"><span className="mb-2 flex text-xs font-normal normal-case"><Upload className="mr-2 h-4 w-4"/>Choose exact file for this entry</span><input required={f.required&&!value} type="file" accept={f.accept} onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])} className="text-xs font-normal normal-case"/></span>:<input required={f.required} type={f.type||'text'} value={String(value||'')} onChange={e=>onValue(e.target.value)} className={cls}/>}</label>}
