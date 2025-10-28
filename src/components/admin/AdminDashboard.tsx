import { useState, useEffect } from 'react';
import { LogOut, Mail, Phone, Calendar, CheckCircle, Clock, XCircle, Image, Video, FileText, Plus, Edit, Trash2, Save, X as CloseIcon, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  visa_type: string;
  message: string;
  status: string;
  created_at: string;
}

interface Advertisement {
  id: string;
  title: string;
  content: string;
  media_type: 'image' | 'video' | 'text';
  media_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
  category: string;
  created_at: string;
}

type TabType = 'inquiries' | 'advertisements' | 'photos';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [showAdForm, setShowAdForm] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadAllData();
    
    // Set up real-time subscriptions
    const inquiriesSubscription = supabase
      .channel('inquiries_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, () => {
        loadInquiries();
      })
      .subscribe();

    const adsSubscription = supabase
      .channel('ads_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'advertisements' }, () => {
        loadAdvertisements();
      })
      .subscribe();

    return () => {
      inquiriesSubscription.unsubscribe();
      adsSubscription.unsubscribe();
    };
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    setError('');
    await Promise.all([
      loadInquiries(),
      loadAdvertisements(),
      loadGalleryImages()
    ]);
    setLoading(false);
  };

  const loadInquiries = async () => {
    try {
      console.log('Loading inquiries...');
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading inquiries:', error);
        setError(`Failed to load inquiries: ${error.message}`);
        return;
      }
      
      console.log('Inquiries loaded:', data?.length || 0);
      if (data) setInquiries(data);
    } catch (error) {
      console.error('Error loading inquiries:', error);
      setError('Failed to load inquiries');
    }
  };

  const loadAdvertisements = async () => {
    try {
      console.log('Loading advertisements...');
      const { data, error } = await supabase
        .from('advertisements')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error loading advertisements:', error);
        return;
      }
      
      console.log('Advertisements loaded:', data?.length || 0);
      if (data) setAdvertisements(data);
    } catch (error) {
      console.error('Error loading advertisements:', error);
    }
  };

  const loadGalleryImages = async () => {
    try {
      console.log('Loading gallery images...');
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading gallery images:', error);
        return;
      }
      
      console.log('Gallery images loaded:', data?.length || 0);
      if (data) setGalleryImages(data);
    } catch (error) {
      console.error('Error loading gallery images:', error);
    }
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      await loadInquiries();
    } catch (error) {
      console.error('Error updating inquiry:', error);
      alert('Failed to update inquiry status');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await loadInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('Failed to delete inquiry');
    }
  };

  const saveAdvertisement = async (ad: Partial<Advertisement>) => {
    try {
      if (editingAd) {
        const { error } = await supabase
          .from('advertisements')
          .update(ad)
          .eq('id', editingAd.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('advertisements')
          .insert([ad]);
        
        if (error) throw error;
      }
      
      await loadAdvertisements();
      setShowAdForm(false);
      setEditingAd(null);
    } catch (error) {
      console.error('Error saving advertisement:', error);
      alert('Failed to save advertisement');
    }
  };

  const deleteAdvertisement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this advertisement?')) return;
    
    try {
      const { error } = await supabase
        .from('advertisements')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await loadAdvertisements();
    } catch (error) {
      console.error('Error deleting advertisement:', error);
      alert('Failed to delete advertisement');
    }
  };

  const toggleAdStatus = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('advertisements')
        .update({ is_active: !isActive })
        .eq('id', id);
      
      if (error) throw error;
      await loadAdvertisements();
    } catch (error) {
      console.error('Error toggling ad status:', error);
      alert('Failed to toggle advertisement status');
    }
  };

  const deleteGalleryImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await loadGalleryImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const filteredInquiries = filter === 'all'
    ? inquiries
    : inquiries.filter(i => i.status === filter);

  const statusCounts = {
    all: inquiries.length,
    pending: inquiries.filter(i => i.status === 'pending').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    completed: inquiries.filter(i => i.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black border-b border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-red-500">Moshi Moshi Nippon</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-4 rounded">
          {error}
          <button onClick={() => setError('')} className="float-right font-bold">×</button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'inquiries', label: `Inquiries (${inquiries.length})` },
              { id: 'advertisements', label: `Advertisements (${advertisements.length})` },
              { id: 'photos', label: `Gallery (${galleryImages.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'inquiries' && (
          <InquiriesTab
            inquiries={filteredInquiries}
            loading={loading}
            filter={filter}
            setFilter={setFilter}
            statusCounts={statusCounts}
            updateInquiryStatus={updateInquiryStatus}
            deleteInquiry={deleteInquiry}
          />
        )}

        {activeTab === 'advertisements' && (
          <AdvertisementsTab
            advertisements={advertisements}
            showAdForm={showAdForm}
            setShowAdForm={setShowAdForm}
            editingAd={editingAd}
            setEditingAd={setEditingAd}
            saveAdvertisement={saveAdvertisement}
            deleteAdvertisement={deleteAdvertisement}
            toggleAdStatus={toggleAdStatus}
          />
        )}

        {activeTab === 'photos' && (
          <GalleryTab
            galleryImages={galleryImages}
            showImageUpload={showImageUpload}
            setShowImageUpload={setShowImageUpload}
            deleteGalleryImage={deleteGalleryImage}
            loadGalleryImages={loadGalleryImages}
          />
        )}
      </div>
    </div>
  );
}

// Inquiries Tab Component
function InquiriesTab({ inquiries, loading, filter, setFilter, statusCounts, updateInquiryStatus, deleteInquiry }: any) {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black mb-6">Inquiries Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {(['all', 'pending', 'contacted', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`p-4 rounded-lg border-2 transition-all ${
                filter === status
                  ? 'bg-black text-white border-red-600'
                  : 'bg-white text-black border-gray-200 hover:border-red-600'
              }`}
            >
              <div className="text-2xl font-bold">{statusCounts[status]}</div>
              <div className="text-sm capitalize">{status}</div>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading inquiries...</p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600">No inquiries found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry: Inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-black">{inquiry.name}</h3>
                      <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
                        {inquiry.visa_type.toUpperCase()}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      inquiry.status === 'completed' ? 'bg-green-100 text-green-800' :
                      inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail size={16} />
                      <a href={`mailto:${inquiry.email}`} className="hover:text-red-600">
                        {inquiry.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone size={16} />
                      <a href={`tel:${inquiry.phone}`} className="hover:text-red-600">
                        {inquiry.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={16} />
                      <span>{new Date(inquiry.created_at).toLocaleString()}</span>
                    </div>
                  </div>

                  {inquiry.message && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                    </div>
                  )}
                </div>

                <div className="flex lg:flex-col gap-2">
                  <button
                    onClick={() => updateInquiryStatus(inquiry.id, 'pending')}
                    className="flex items-center space-x-1 px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                  >
                    <Clock size={16} />
                    <span>Pending</span>
                  </button>
                  <button
                    onClick={() => updateInquiryStatus(inquiry.id, 'contacted')}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                  >
                    <Mail size={16} />
                    <span>Contacted</span>
                  </button>
                  <button
                    onClick={() => updateInquiryStatus(inquiry.id, 'completed')}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                  >
                    <CheckCircle size={16} />
                    <span>Complete</span>
                  </button>
                  <button
                    onClick={() => deleteInquiry(inquiry.id)}
                    className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    <XCircle size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// Advertisements Tab Component
function AdvertisementsTab({ advertisements, showAdForm, setShowAdForm, editingAd, setEditingAd, saveAdvertisement, deleteAdvertisement, toggleAdStatus }: any) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media_type: 'text' as 'image' | 'video' | 'text',
    media_url: '',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    if (editingAd) {
      setFormData(editingAd);
    } else {
      setFormData({
        title: '',
        content: '',
        media_type: 'text',
        media_url: '',
        display_order: advertisements.length,
        is_active: true
      });
    }
  }, [editingAd, advertisements.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdvertisement(formData);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-black">Advertisements Management</h2>
        <button
          onClick={() => {
            setEditingAd(null);
            setShowAdForm(true);
          }}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus size={20} />
          <span>Add Advertisement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advertisements.map((ad: Advertisement) => (
          <div key={ad.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {ad.media_type === 'image' && ad.media_url && (
              <img src={ad.media_url} alt={ad.title} className="w-full h-48 object-cover" />
            )}
            {ad.media_type === 'video' && ad.media_url && (
              <video src={ad.media_url} controls className="w-full h-48" />
            )}
            {ad.media_type === 'text' && (
              <div className="w-full h-48 bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center p-4">
                <p className="text-white text-center font-bold">{ad.title}</p>
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-black">{ad.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  ad.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {ad.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{ad.content}</p>
              <div className="flex items-center space-x-2 mb-4">
                {ad.media_type === 'image' && <Image size={16} className="text-gray-500" />}
                {ad.media_type === 'video' && <Video size={16} className="text-gray-500" />}
                {ad.media_type === 'text' && <FileText size={16} className="text-gray-500" />}
                <span className="text-xs text-gray-500 capitalize">{ad.media_type}</span>
                <span className="text-xs text-gray-400">Order: {ad.display_order}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingAd(ad);
                    setShowAdForm(true);
                  }}
                  className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm flex items-center justify-center"
                >
                  <Edit size={14} className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => toggleAdStatus(ad.id, ad.is_active)}
                  className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 text-sm"
                >
                  {ad.is_active ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => deleteAdvertisement(ad.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {advertisements.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600">No advertisements yet. Create your first one!</p>
        </div>
      )}

      {showAdForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black">
                {editingAd ? 'Edit Advertisement' : 'Add Advertisement'}
              </h3>
              <button onClick={() => setShowAdForm(false)} className="text-gray-500 hover:text-black">
                <CloseIcon size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                  placeholder="Enter advertisement title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">Content *</label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none resize-none"
                  placeholder="Enter advertisement content"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">Media Type *</label>
                <select
                  required
                  value={formData.media_type}
                  onChange={(e) => setFormData({ ...formData, media_type: e.target.value as any })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                >
                  <option value="text">Text Only</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              {(formData.media_type === 'image' || formData.media_type === 'video') && (
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Media URL {formData.media_type === 'text' ? '' : '*'}
                  </label>
                  <input
                    type="url"
                    required={formData.media_type !== 'text'}
                    value={formData.media_url}
                    onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Upload your image to a service like Imgur or ImgBB and paste the direct URL here
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-black mb-2">Display Order</label>
                <input
                  type="number"
                  min="0"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                  placeholder="0"
                />
                <p className="text-sm text-gray-500 mt-1">Lower numbers appear first</p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-black">
                  Active (Show on website)
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Save size={20} />
                <span>{editingAd ? 'Update' : 'Create'} Advertisement</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// Gallery Tab Component with Drag & Drop
function GalleryTab({ galleryImages, showImageUpload, setShowImageUpload, deleteGalleryImage, loadGalleryImages }: any) {
  const [uploadData, setUploadData] = useState({
    image_url: '',
    caption: '',
    category: 'general'
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleImageFile(files[0]);
    }
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Convert image to base64 or use a free image hosting service
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setUploadData({ ...uploadData, image_url: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadData.image_url) {
      alert('Please provide an image');
      return;
    }

    setUploading(true);

    try {
      console.log('Uploading image data:', uploadData);
      
      const { data, error } = await supabase
        .from('gallery_images')
        .insert([uploadData])
        .select();

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      console.log('Image uploaded successfully:', data);
      await loadGalleryImages();
      setShowImageUpload(false);
      setUploadData({
        image_url: '',
        caption: '',
        category: 'general'
      });
      alert('Image uploaded successfully! ✓');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-black">Gallery Management</h2>
        <button
          onClick={() => setShowImageUpload(true)}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus size={20} />
          <span>Add Image</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryImages.map((img: GalleryImage) => (
          <div key={img.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="relative">
              <img 
                src={img.image_url} 
                alt={img.caption} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={() => deleteGalleryImage(img.id)}
                  className="opacity-0 group-hover:opacity-100 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-700 font-medium">{img.caption || 'No caption'}</p>
              <span className="text-xs text-gray-500 capitalize">{img.category}</span>
            </div>
          </div>
        ))}
      </div>

      {galleryImages.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Image size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No images in gallery. Upload your first image!</p>
        </div>
      )}

      {showImageUpload && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black">Upload Image</h3>
              <button onClick={() => setShowImageUpload(false)} className="text-gray-500 hover:text-black">
                <CloseIcon size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Drag and Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-4 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-red-600 bg-red-50' : 'border-gray-300 bg-gray-50'
                }`}
              >
                <Upload size={48} className={`mx-auto mb-4 ${dragActive ? 'text-red-600' : 'text-gray-400'}`} />
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Drag & Drop your image here
                </p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <label className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 cursor-pointer inline-block">
                  Browse Files
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-4">Maximum file size: 5MB</p>
              </div>

              {/* Image Preview */}
              {uploadData.image_url && (
                <div className="relative">
                  <img 
                    src={uploadData.image_url} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setUploadData({ ...uploadData, image_url: '' })}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <CloseIcon size={16} />
                  </button>
                </div>
              )}

              {/* Alternative: URL Input */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Or paste image URL
                </label>
                <input
                  type="url"
                  value={uploadData.image_url.startsWith('data:') ? '' : uploadData.image_url}
                  onChange={(e) => setUploadData({ ...uploadData, image_url: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload to Imgur, ImgBB, or similar service and paste the direct URL
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">Caption</label>
                <input
                  type="text"
                  value={uploadData.caption}
                  onChange={(e) => setUploadData({ ...uploadData, caption: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                  placeholder="Enter image caption"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">Category</label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                >
                  <option value="general">General</option>
                  <option value="events">Events</option>
                  <option value="success">Success Stories</option>
                  <option value="team">Team</option>
                  <option value="office">Office</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={uploading || !uploadData.image_url}
                className="w-full bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    <span>Upload Image</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;