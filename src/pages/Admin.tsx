import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { Lock, FileText, Users, Settings, LogOut, LayoutDashboard, Search, Bell, Image as ImageIcon, Calendar, Plus, Trash2, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin');
    } else {
      setError('Invalid email or password access denied.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 sm:p-12 w-full max-w-md border border-slate-200">
        <div className="mb-8">
          <span className="text-gold text-[10px] font-bold uppercase tracking-widest mb-2 block">Secure Admin Access</span>
          <h2 className="text-3xl font-serif text-slate-900 leading-none mb-2">Portal Login</h2>
          <p className="text-slate-500 text-xs">NACETEM Extranet Authorized Access Only</p>
        </div>
        
        {error && <div className="p-3 bg-red-50 text-red-700 text-xs border border-red-200 mb-6">{error}</div>}
        
        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 focus:border-emerald-700 outline-none text-sm bg-slate-50 focus:bg-white transition-colors"
              placeholder="adminacetem@gmail.com"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 focus:border-emerald-700 outline-none text-sm bg-slate-50 focus:bg-white transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest py-4 transition-colors"
          >
            Authenticate
          </button>
        </form>
        <div className="mt-8 text-center text-[10px] tracking-widest uppercase text-slate-400">
          Protected by FMIST Infrastructure
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const { logout } = useAuth();
  const { gallery, addGalleryImage, removeGalleryImage, events, addEvent, removeEvent, isLoading } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImageTitle, setNewImageTitle] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newImageFile && newImageTitle) {
      try {
        setIsUploadingImage(true);
        let imageUrl = '';
        
        if (supabase) {
          const fileExt = newImageFile.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError, data } = await supabase.storage
            .from('gallery')
            .upload(filePath, newImageFile);

          if (uploadError) {
            throw uploadError;
          }

          const { data: { publicUrl } } = supabase.storage
            .from('gallery')
            .getPublicUrl(filePath);

          imageUrl = publicUrl;
        } else {
          // Fallback if supabase isn't configged
          imageUrl = URL.createObjectURL(newImageFile);
        }

        addGalleryImage({
          id: Date.now().toString(),
          url: imageUrl,
          title: newImageTitle,
        });
        
        setNewImageFile(null);
        setNewImageTitle('');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Make sure the storage bucket "gallery" exists and is public.');
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && newEventDate && newEventLocation && newEventDescription) {
      addEvent({
        id: Date.now().toString(),
        title: newEventTitle,
        date: newEventDate,
        location: newEventLocation,
        description: newEventDescription,
      });
      setNewEventTitle('');
      setNewEventDate('');
      setNewEventLocation('');
      setNewEventDescription('');
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview' },
    { icon: ImageIcon, label: 'Gallery Manager' },
    { icon: Calendar, label: 'Events Manager' },
    { icon: FileText, label: 'News Manager' },
    { icon: Settings, label: 'System Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row h-screen overflow-hidden relative">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative inset-y-0 left-0 w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-bold tracking-widest text-white uppercase">NACETEM</h2>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Admin Dashboard</p>
          </div>
          <button className="md:hidden text-slate-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item, idx) => (
            <button 
              key={idx}
              onClick={() => {
                setActiveTab(item.label);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-[6px] ${
                activeTab === item.label 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                  : 'text-slate-200 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800 transition-colors rounded-[6px]"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-4 w-full md:w-96">
            <button className="md:hidden text-slate-600 p-1 -ml-1 border border-slate-200 rounded-[6px] hover:bg-slate-50 transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-sm hidden sm:block">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-[6px] text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 shrink-0">
            <button className="text-slate-400 hover:text-slate-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 bg-slate-50 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Syncing with Supabase...</p>
              </div>
            </div>
          )}
          <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-2 block">
            {activeTab === 'Overview' ? 'Dashboard' : activeTab}
          </span>
          <h1 className="text-3xl font-serif text-slate-900 mb-8">
            {activeTab === 'Overview' && 'Systems Overview'}
            {activeTab === 'Gallery Manager' && 'Gallery Media'}
            {activeTab === 'Events Manager' && 'Events Calendar'}
            {activeTab !== 'Overview' && activeTab !== 'Gallery Manager' && activeTab !== 'Events Manager' && activeTab}
          </h1>

          {activeTab === 'Overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 border border-slate-200 flex items-center space-x-4">
                  <div className="h-12 w-12 bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">News Articles</p>
                    <h3 className="text-2xl font-serif text-slate-900">24</h3>
                  </div>
                </div>
                <div className="bg-white p-6 border border-slate-200 flex items-center space-x-4">
                  <div className="h-12 w-12 bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Gallery Items</p>
                    <h3 className="text-2xl font-serif text-slate-900">{gallery.length}</h3>
                  </div>
                </div>
                <div className="bg-white p-6 border border-slate-200 flex items-center space-x-4">
                  <div className="h-12 w-12 bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Active Events</p>
                    <h3 className="text-2xl font-serif text-slate-900">{events.length}</h3>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'Gallery Manager' && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200 p-6">
                <h2 className="text-lg font-serif text-slate-900 mb-4">Add New Image</h2>
                <form onSubmit={handleAddImage} className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="flex-1 w-full">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Upload Photo</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
                      className="w-full px-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-emerald-700 bg-slate-50"
                      required
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Image Title</label>
                    <input 
                      type="text" 
                      placeholder="Image Title"
                      value={newImageTitle}
                      onChange={(e) => setNewImageTitle(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 text-sm focus:outline-none focus:border-emerald-700 bg-slate-50"
                      required
                    />
                  </div>
                  <button type="submit" disabled={isUploadingImage} className={`bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center transition-colors ${isUploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isUploadingImage ? 'Uploading...' : <><Plus className="w-4 h-4 mr-2" /> Add Image</>}
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((img) => (
                  <div key={img.id} className="bg-white border border-slate-200 group flex flex-col">
                    <div className="h-48 overflow-hidden border-b border-slate-100">
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex justify-between items-center bg-slate-50 flex-1">
                      <h3 className="font-serif text-slate-900 text-sm truncate pr-4">{img.title}</h3>
                      <button 
                        onClick={() => removeGalleryImage(img.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors bg-white p-2 border border-slate-200 rounded-full"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {gallery.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-slate-300 bg-white">
                    No images in the gallery. Add one above.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'Events Manager' && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200 p-6">
                <h2 className="text-lg font-serif text-slate-900 mb-4">Add New Event</h2>
                <form onSubmit={handleAddEvent} className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Event Title"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Event Date (e.g., August 15, 2026)"
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Event Location (e.g., Abuja, Nigeria)"
                        value={newEventLocation}
                        onChange={(e) => setNewEventLocation(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <textarea
                      placeholder="Event Description"
                      value={newEventDescription}
                      onChange={(e) => setNewEventDescription(e.target.value)}
                      className="w-full sm:flex-1 h-24 px-4 py-3 border border-slate-300 text-sm focus:outline-none focus:border-emerald-700 resize-none"
                      required
                    ></textarea>
                    <button type="submit" className="w-full sm:w-auto self-stretch bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center transition-colors shrink-0">
                      <Plus className="w-4 h-4 mr-2" /> Add Event
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {events.map((evt) => (
                  <div key={evt.id} className="bg-white border border-slate-200 p-6 relative flex flex-col items-start group">
                    <button 
                      onClick={() => removeEvent(evt.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition-colors bg-white p-2 border border-slate-200 rounded-full opacity-0 group-hover:opacity-100"
                      title="Remove event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-bold uppercase tracking-widest text-gold">{evt.date}</span>
                    </div>
                    <h3 className="text-lg font-serif text-slate-900 mb-2 truncate w-full pr-8">{evt.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">{evt.location}</p>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{evt.description}</p>
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-slate-300 bg-white">
                    No active events. Add one above.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'News Manager' && (
            <div className="bg-white border border-slate-200 p-16 text-center rounded-[11px]">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-serif text-slate-900 mb-2">News Content Manager</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">This module is being set up to allow adding, editing, and managing news articles and publications.</p>
            </div>
          )}

          {activeTab !== 'Overview' && activeTab !== 'Gallery Manager' && activeTab !== 'Events Manager' && activeTab !== 'News Manager' && (
            <div className="bg-white border border-slate-200 p-12 text-center text-slate-500">
              <p className="text-sm">Module <strong className="text-slate-900 font-serif">{activeTab}</strong> is currently being developed according to the latest administrative directives.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
