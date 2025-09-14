"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Heart, Star, MapPin, Clock, Menu, X, Home, Search } from "lucide-react";

// Types
type Language = 'ku' | 'ar' | 'en';
type AttractionCategory = "Historical" | "Natural" | "Cultural" | "All";

interface Attraction {
  id: number;
  name: {
    ku: string;
    ar: string;
    en: string;
  };
  category: AttractionCategory;
  description: {
    ku: string;
    ar: string;
    en: string;
  };
  shortDescription: {
    ku: string;
    ar: string;
    en: string;
  };
  rating: number;
  location: {
    ku: string;
    ar: string;
    en: string;
  };
  openingHours: string;
  images: string[];
}

// Translations
const translations = {
  ku: {
    appName: "BoKwe",
    tagline: "دۆزەرەوەی جوانی و مێژووی ڕانیا",
    discover: "دۆزەرەوە",
    attractions: "بینینەکان",
    allCategories: "هەموو هاوپۆلەکان",
    historical: "مێژوویی",
    natural: "سروشتی",
    cultural: "کولتووری",
    filter: "پاڵێوە",
    about: "دەربارە",
    information: "زانیاری",
    gallery: "گالەری",
    noAttractions: "هیچ بینینێک نەدۆزرایەوە لەم هاوپۆلەدا.",
    viewAll: "بینینی هەموو",
    back: "گەڕانەوە",
    contact: "پەیوەندی",
    quickLinks: "بەستەرە خێراکان",
    accommodations: "شوێنی نیشتەجێبوون",
    transportation: "گواستنەوە",
    cuisine: "چێشتخواردن",
    events: "ڕووداوەکان",
    copyright: "هەموو مافەکان پارێزراون.",
    home: "ماڵەوە",
    search: "گەڕان"
  },
  ar: {
    appName: "BoKwe",
    tagline: "اكتشف جمال ومعلم رانية",
    discover: "اكتشف",
    attractions: "المعالم",
    allCategories: "جميع الفئات",
    historical: "تاريخي",
    natural: "طبيعي",
    cultural: "ثقافي",
    filter: "تصفية",
    about: "حول",
    information: "معلومات",
    gallery: "معرض الصور",
    noAttractions: "لم يتم العثور على معالم في هذه الفئة.",
    viewAll: "عرض الكل",
    back: "عودة",
    contact: "اتصل بنا",
    quickLinks: "روابط سريعة",
    accommodations: "الإقامة",
    transportation: "المواصلات",
    cuisine: "المأكولات",
    events: "الفعاليات",
    copyright: "جميع الحقوق محفوظة.",
    home: "الرئيسية",
    search: "بحث"
  },
  en: {
    appName: "BoKwe",
    tagline: "Discover the beauty and history of Ranya",
    discover: "Discover",
    attractions: "Attractions",
    allCategories: "All Categories",
    historical: "Historical",
    natural: "Natural",
    cultural: "Cultural",
    filter: "Filter",
    about: "About",
    information: "Information",
    gallery: "Gallery",
    noAttractions: "No attractions found in this category.",
    viewAll: "View All",
    back: "Back",
    contact: "Contact Us",
    quickLinks: "Quick Links",
    accommodations: "Accommodations",
    transportation: "Transportation",
    cuisine: "Local Cuisine",
    events: "Events Calendar",
    copyright: "All rights reserved.",
    home: "Home",
    search: "Search"
  }
};

// Mock data for attractions in Ranya
const attractionsData: Attraction[] = [
  {
    id: 1,
    name: {
      ku: "قلعەی ڕانیا",
      ar: "قلعة رانية",
      en: "Ranya Castle"
    },
    category: "Historical",
    description: {
      ku: "فرتەزەیەکی مێژوویی کۆن لەسەر شاری ڕانیا. دروستکراوە لە سەدەی ١٢ەم، ئەم قلعەیە دیمەنێکی سەرقاڵ دەداتەوە لەسەر دەوروبەر و ماڵێکی پێشەنگی مێژووی ناوخۆیی هەڵگرتووە.",
      ar: "حصن تاريخي رائع يطل على مدينة رانية. بُني في القرن الثاني عشر، ويقدم هذا الحصن إطلالة خلابة على المناظر المحيطة ويضم متحفاً رائعاً للتاريخ المحلي.",
      en: "A magnificent medieval fortress overlooking the city of Ranya. Built in the 12th century, this castle offers breathtaking views of the surrounding landscape and houses a fascinating museum of local history."
    },
    shortDescription: {
      ku: "فرتەزەیەکی مێژوویی کۆن بە دیمەنێکی سەرقاڵ",
      ar: "حصن مذهل مع إطلالة خلابة",
      en: "Medieval fortress with panoramic views"
    },
    rating: 4.8,
    location: {
      ku: "ناوەندی شار",
      ar: "وسط المدينة",
      en: "City Center"
    },
    openingHours: "9:00 AM - 6:00 PM",
    images: []
  },
  {
    id: 2,
    name: {
      ku: "دەریاچەی زەمینی",
      ar: "بحيرة الزمرد",
      en: "Emerald Lake"
    },
    category: "Natural",
    description: {
      ku: "دەریاچەیەکی سروشتی جوان لە دەوروبەری دارستانێکی سەوز. کەمیل بۆ ڕێوپێی، پیکنیک، و تەماشای باڵندە. دەریاچەکە بەتایبەتی جوانە لە کاتی خۆرهەڵاتن و خۆراوەستن کە ئاوەکە ڕەنگەکانی ئاسمان دووبارە دەکاتەوە.",
      ar: "بحيرة طبيعية خلابة محاطة بأشجار الغابات. مثالية للتنزه والبيكنيك ومراقبة الطيور. تبدو البحيرة جميلة خاصةً عند شروق الشمس وغروبها عندما تعكس مياهها ألوان السماء.",
      en: "A stunning natural lake surrounded by lush forests. Perfect for hiking, picnicking, and bird watching. The lake is especially beautiful during sunrise and sunset when the water reflects the sky colors."
    },
    shortDescription: {
      ku: "دەریاچەیەکی سروشتی جوان لە دەوروبەری دارستان",
      ar: "بحيرة خلابة محاطة بالطبيعة",
      en: "Scenic lake surrounded by nature"
    },
    rating: 4.6,
    location: {
      ku: "ناحیەی باکوور",
      ar: "المنطقة الشمالية",
      en: "Northern District"
    },
    openingHours: "24 Hours",
    images: []
  },
  {
    id: 3,
    name: {
      ku: "بازاڕی گەورەی ڕانیا",
      ar: "السوق الكبير رانية",
      en: "Ranya Grand Bazaar"
    },
    category: "Cultural",
    description: {
      ku: "یەکێک لە کۆنترین و گەورەترین بازاڕە کۆنەکان لە ناوچەکەدا. کەڵەشێوی کاردەکەن، بەهیزەکان، پارچەکانی کەتان، و خواردنە خێراکانی ناوخۆیی. بازاڕەکە بەتایبەتی کارا دەبێت لە کۆتایی هەفتەدا.",
      ar: "واحد من أقدم وأكبر الأسواق التقليدية في المنطقة. تجربة حرفيين محليين وتوابل وبهارات ومنتجات نسيجية وأطعمة شارع لذيذة. يزداد السوق نشاطاً خاصةً في عطلة نهاية الأسبوع.",
      en: "One of the oldest and largest traditional markets in the region. Experience authentic local crafts, spices, textiles, and delicious street food. The bazaar is especially vibrant during weekends."
    },
    shortDescription: {
      ku: "بازاڕێکی کۆن بە کاردەکەنی ناوخۆیی",
      ar: "سوق تقليدي بسلع محلية",
      en: "Traditional market with local crafts"
    },
    rating: 4.5,
    location: {
      ku: "شاری کۆن",
      ar: "المدينة القديمة",
      en: "Old Town"
    },
    openingHours: "8:00 AM - 10:00 PM",
    images: []
  },
  {
    id: 4,
    name: {
      ku: "مێرگە کۆنەکانی زەلمەر",
      ar: "أطلال زلمار القديمة",
      en: "Ancient Ruins of Zalmar"
    },
    category: "Historical",
    description: {
      ku: "ماوەیەک لە تمدنێکی کۆن کە دوو هەزار ساڵ دێت. کارەکانی باڵایی دەرکەوتووە کە پارچەکانی کاول، ئامرازەکان، و نووسراوەکان کە تێبینییەکان دەدەن لەسەر ژیانی نیشتەوانە کۆنەکان.",
      ar: "بقايا حضارة قديمة يعود تاريخها إلى أكثر من ألفي عام. كشفت الحفريات عن أطباق وأدوات ونقوش توفر رؤى حول حياة السكان القدماء.",
      en: "Remnants of an ancient civilization dating back over 2000 years. Archaeological excavations have uncovered pottery, tools, and inscriptions that provide insights into the lives of the ancient inhabitants."
    },
    shortDescription: {
      ku: "مێرگەیەکی باڵایی کۆن",
      ar: "موقع أثري قديم",
      en: "Ancient archaeological site"
    },
    rating: 4.3,
    location: {
      ku: "کوێڵە ڕۆژهەڵات",
      ar: "التلال الشرقية",
      en: "Eastern Hills"
    },
    openingHours: "8:00 AM - 5:00 PM",
    images: []
  },
  {
    id: 5,
    name: {
      ku: "باغە بوەتانیکییەکانی ڕانیا",
      ar: "الحدائق النباتية رانية",
      en: "Ranya Botanical Gardens"
    },
    category: "Natural",
    description: {
      ku: "لەسەر ٥٠ دۆنوم پاشەکەوت کراوە، ئەم باغانە جۆرەکانی ناوخۆیی و ناوخۆیی پیشان دەدەن. تایبەتمەندییەکان بەشەکانی بابەتدار، ڕێڕەوەکان، ماڵی پەپووە، و شوێنێکی خۆشەویستی هەڵگرتووە.",
      ar: "تغطي مساحة 50 فداناً، تعرض هذه الحدائق أنواعاً نباتية محلية وأجنبية. تتضمن الميزات أقساماً موضوعية ومسارات للمشي وبيت فراشات ومنطقة هادئة للتأمل.",
      en: "Spread across 50 acres, these gardens showcase native and exotic plant species. Features include themed sections, walking trails, a butterfly house, and a peaceful meditation area."
    },
    shortDescription: {
      ku: "باغە جوانەکان بە جۆرەکانی دیاریکراو",
      ar: "حدائق جميلة بأنواع متنوعة من النباتات",
      en: "Beautiful gardens with diverse flora"
    },
    rating: 4.7,
    location: {
      ku: "ناحیەی باشوور",
      ar: "المنطقة الجنوبية",
      en: "Southern District"
    },
    openingHours: "7:00 AM - 7:00 PM",
    images: []
  },
  {
    id: 6,
    name: {
      ku: "هالی مووزیکی کۆنەوەیی",
      ar: "قاعة الموسيقى التقليدية",
      en: "Traditional Music Hall"
    },
    category: "Cultural",
    description: {
      ku: "ناوەندێکی کولتووری بۆ پاراستنی مۆسیقای کۆنەوەیی ناوخۆیی. ئەنجامدانە باوەڕهێڵەکان ئامرازە کۆنەوەییەکان و گۆرانییەکانی گەلی پیشان دەدەن. سەردانکەران دەتوانن لە وۆرکشۆپەکاندا بەشداربن بۆ فێربوونی سەماکانی کۆنەوەیی.",
      ar: "مركز ثقافي مخصص للحفاظ على التقاليد الموسيقية المحلية. تتميز العروض بآلات تقليدية وأغاني شعبية. يمكن للزوار المشاركة في ورش عمل لتعلم الرقصات التقليدية.",
      en: "A cultural center dedicated to preserving local musical traditions. Regular performances feature traditional instruments and folk songs. Visitors can also participate in workshops to learn traditional dances."
    },
    shortDescription: {
      ku: "ناوەندێکی کولتووری بۆ مۆسیقای کۆنەوەیی",
      ar: "مركز ثقافي للموسيقى التقليدية",
      en: "Cultural center for traditional music"
    },
    rating: 4.9,
    location: {
      ku: "چوارگۆشەی کولتووری",
      ar: "الربع الثقافي",
      en: "Cultural Quarter"
    },
    openingHours: "10:00 AM - 9:00 PM",
    images: []
  }
];

export default function BoKweTravelApp() {
  const [language, setLanguage] = useState<Language>('ku');
  const [selectedCategory, setSelectedCategory] = useState<AttractionCategory>("All");
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter attractions based on selected category and search query
  const filteredAttractions = attractionsData.filter(attraction => {
    const matchesCategory = selectedCategory === "All" || attraction.category === selectedCategory;
    const matchesSearch = 
      attraction.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.description[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Reset to attraction list view
  const resetView = () => {
    setSelectedAttraction(null);
  };

  // Get translation for current language
  const t = (key: keyof typeof translations.ku) => {
    return translations[language][key];
  };

  // Category translations
  const getCategoryTranslation = (category: AttractionCategory) => {
    switch (category) {
      case "Historical": return t('historical');
      case "Natural": return t('natural');
      case "Cultural": return t('cultural');
      case "All": return t('allCategories');
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MapPin className="text-emerald-600 mr-2" />
              <h1 className="text-2xl font-bold text-emerald-800">{t('appName')}</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant={language === 'ku' ? "default" : "outline"} 
                size="sm"
                onClick={() => setLanguage('ku')}
                className="text-sm"
              >
                کوردی
              </Button>
              <Button 
                variant={language === 'ar' ? "default" : "outline"} 
                size="sm"
                onClick={() => setLanguage('ar')}
                className="text-sm"
              >
                عەرەبی
              </Button>
              <Button 
                variant={language === 'en' ? "default" : "outline"} 
                size="sm"
                onClick={() => setLanguage('en')}
                className="text-sm"
              >
                English
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col space-y-3">
              <div className="flex space-x-2">
                <Button 
                  variant={language === 'ku' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setLanguage('ku')}
                  className="flex-1"
                >
                  کوردی
                </Button>
                <Button 
                  variant={language === 'ar' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setLanguage('ar')}
                  className="flex-1"
                >
                  عەرەبی
                </Button>
                <Button 
                  variant={language === 'en' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className="flex-1"
                >
                  English
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder={t('search')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {selectedAttraction ? (
          // Attraction Detail View
          <div className="max-w-4xl mx-auto">
            <Button 
              onClick={resetView} 
              variant="outline" 
              className="mb-6 flex items-center"
            >
              ← {t('back')}
            </Button>
            
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-64 md:h-96" />
                <Button
                  onClick={() => toggleFavorite(selectedAttraction.id)}
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full"
                >
                  <Heart 
                    className={favorites.includes(selectedAttraction.id) ? "fill-red-500 text-red-500" : ""} 
                  />
                </Button>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl">{selectedAttraction.name[language]}</CardTitle>
                    <div className="flex items-center mt-2">
                      <Star className="text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-medium">{selectedAttraction.rating}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-gray-600">{getCategoryTranslation(selectedAttraction.category)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-2">{t('about')}</h3>
                    <p className="text-gray-700">{selectedAttraction.description[language]}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{t('information')}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <MapPin className="text-emerald-600 mr-2 h-5 w-5" />
                          <span>{selectedAttraction.location[language]}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="text-emerald-600 mr-2 h-5 w-5" />
                          <span>{selectedAttraction.openingHours}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{t('gallery')}</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="bg-gray-200 border-2 border-dashed rounded-xl w-full aspect-square" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Attraction List View
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{t('discover')} {t('attractions')}</h2>
                <p className="text-gray-600">{t('tagline')}</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <div className="relative md:hidden">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder={t('search')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="hidden md:block relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder={t('search')}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={(value: AttractionCategory) => setSelectedCategory(value)}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder={t('filter')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">{t('allCategories')}</SelectItem>
                    <SelectItem value="Historical">{t('historical')}</SelectItem>
                    <SelectItem value="Natural">{t('natural')}</SelectItem>
                    <SelectItem value="Cultural">{t('cultural')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAttractions.map((attraction) => (
                <Card 
                  key={attraction.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedAttraction(attraction)}
                >
                  <div className="relative">
                    <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(attraction.id);
                      }}
                      variant="secondary"
                      size="icon"
                      className="absolute top-3 right-3 rounded-full"
                    >
                      <Heart 
                        className={favorites.includes(attraction.id) ? "fill-red-500 text-red-500" : ""} 
                      />
                    </Button>
                    <div className="absolute bottom-3 left-3 bg-emerald-600 text-white text-xs font-medium px-2 py-1 rounded">
                      {getCategoryTranslation(attraction.category)}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{attraction.name[language]}</CardTitle>
                      <div className="flex items-center">
                        <Star className="text-yellow-500 fill-yellow-500 h-4 w-4" />
                        <span className="ml-1 text-sm font-medium">{attraction.rating}</span>
                      </div>
                    </div>
                    <CardDescription>{attraction.location[language]}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-700">{attraction.shortDescription[language]}</p>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{attraction.openingHours}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredAttractions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{t('noAttractions')}</p>
                <Button 
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }} 
                  variant="outline" 
                  className="mt-4"
                >
                  {t('viewAll')}
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{t('appName')}</h3>
              <p className="text-emerald-100">
                {t('tagline')}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
              <ul className="space-y-2 text-emerald-100">
                <li>info@bokwe.com</li>
                <li>+964 123 456 789</li>
                <li>{language === 'ku' ? 'نووسینگەی گەشتیارگەی ڕانیا، شەقامی سەرەکی' : 
                    language === 'ar' ? 'مكتب سياحة رانية، الشارع الرئيسي' : 
                    'Ranya Tourism Office, Main Street'}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
              <ul className="space-y-2 text-emerald-100">
                <li className="hover:text-white cursor-pointer">{t('accommodations')}</li>
                <li className="hover:text-white cursor-pointer">{t('transportation')}</li>
                <li className="hover:text-white cursor-pointer">{t('cuisine')}</li>
                <li className="hover:text-white cursor-pointer">{t('events')}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-emerald-700 mt-8 pt-6 text-center text-emerald-200">
            <p>© 2023 {t('appName')}. {t('copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
