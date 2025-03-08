'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Calendar, Star, Coffee, Wifi, Car, ShoppingBag, HomeIcon } from 'lucide-react';

// Define language type
type LanguageCode = 'en' | 'sr';

// Type for apartment data
type Apartment = {
  id: number;
  name: string;
  price: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  size: string;
  amenities: string[];
  description: string;
  images: string[];
  availability: {
    available: string[];
    booked: string[];
  };
};

// Type for translations
type Translations = {
  [key in LanguageCode]: {
    title: string;
    subtitle: string;
    contactTitle: string;
    callHours: string;
    viewingArrange: string;
    phoneOnlyNote: string;
    calendar: string;
    available: string;
    booked: string;
    pending: string;
    bedrooms: string;
    bathrooms: string;
    amenities: string;
    location: string;
    distance: string;
    rating: string;
    reviews: string;
    book: string;
    contact: string;
    overview: string;
    features: string;
    nearby: string;
    tourismSpots: string;
    restaurants: string;
    shopping: string;
    transportation: string;
    priceDetails: string;
    cancelPolicy: string;
    footer: string;
    toggleLanguage: string;
  };
};

// Calendar Component
const CalendarComponent = ({ apartment, t, language }) => {
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

  const monthNames = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    sr: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"]
  };

  const prevMonth = () => {
    setViewMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (viewMonth === 0) setViewYear((prev) => prev - 1);
  };

  const nextMonth = () => {
    setViewMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (viewMonth === 11) setViewYear((prev) => prev + 1);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8 m-1"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isAvailable = apartment.availability.available.includes(dateString);
      const isBooked = apartment.availability.booked.includes(dateString);
      let statusClass = "bg-gray-100";
      if (isAvailable) statusClass = "bg-green-200";
      if (isBooked) statusClass = "bg-red-200";
      days.push(
        <div 
          key={i} 
          className={`w-8 h-8 flex items-center justify-center ${statusClass} m-1 rounded cursor-pointer hover:opacity-80`}
          title={isAvailable ? t.available : isBooked ? t.booked : t.pending}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const weekDays = {
    en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    sr: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"]
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-blue-600 hover:text-blue-800">
          &lt; {language === 'en' ? 'Prev' : 'Preth'}
        </button>
        <h3 className="text-lg font-semibold">{monthNames[language][viewMonth]} {viewYear}</h3>
        <button onClick={nextMonth} className="text-blue-600 hover:text-blue-800">
          {language === 'en' ? 'Next' : 'Sled'} &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {weekDays[language].map((day, index) => (
          <div key={index} className="text-center text-sm font-medium">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">{renderDays()}</div>
      <div className="flex mt-4 text-sm">
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 bg-green-200 mr-1"></div>
          <span>{t.available}</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 bg-red-200 mr-1"></div>
          <span>{t.booked}</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-200 mr-1"></div>
          <span>{t.pending}</span>
        </div>
      </div>
    </div>
  );
};

// Nearby Attractions Component
const NearbyAttractions = ({ nearby, t }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      {[
        { icon: Star, title: t.tourismSpots, items: nearby.tourism },
        { icon: Coffee, title: t.restaurants, items: nearby.restaurants },
        { icon: ShoppingBag, title: t.shopping, items: nearby.shopping },
        { icon: Car, title: t.transportation, items: nearby.transportation }
      ].map((section, index) => (
        <div key={index}>
          <h4 className="text-md font-semibold mb-2 flex items-center">
            <section.icon size={18} className="mr-2 text-blue-600" />
            {section.title}
          </h4>
          <ul className="space-y-2">
            {section.items.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full mr-2"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedApartment, setSelectedApartment] = useState(0);
  const [language, setLanguage] = useState<LanguageCode>('sr');
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Multilingual content, apartment data, nearby attractions, and contact info
  // ... (same as your original code)

  const t = translations[language];
  const apartments = apartmentsData[language];
  const contact = contactInfo[language];
  const nearby = nearbyAttractions[language];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === apartments[selectedApartment].images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? apartments[selectedApartment].images.length - 1 : prev - 1));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'sr' : 'en'));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Language Toggle */}
      <div className="flex justify-end mb-4">
        <button onClick={toggleLanguage} className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-700">
          {t.toggleLanguage}
        </button>
      </div>
      
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">{t.title}</h1>
        <p className="text-xl text-gray-600">{t.subtitle}</p>
      </header>

      {/* Apartment Selection Tabs */}
      <div className="flex mb-8 overflow-x-auto">
        {apartments.map((apartment, index) => (
          <button
            key={apartment.id}
            className={`px-6 py-3 font-medium text-lg mr-2 rounded-t-lg whitespace-nowrap ${
              selectedApartment === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => {
              setSelectedApartment(index);
              setCurrentSlide(0);
              setActiveTab('overview');
              setShowFullDescription(false);
            }}
          >
            {apartment.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Image Carousel and Details */}
        <div className="md:w-2/3">
          {/* Image Carousel */}
          <div className="relative h-96 overflow-hidden rounded-lg shadow-lg mb-6">
            <div 
              style={{
                backgroundImage: `url(${apartments[selectedApartment].images[currentSlide]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%'
              }}
            />
            <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
              ←
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
              →
            </button>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {currentSlide + 1} / {apartments[selectedApartment].images.length}
            </div>
          </div>
          
          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-4 mb-6">
            {apartments[selectedApartment].images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 mx-1 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          {/* Basic Info Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{apartments[selectedApartment].name}</h2>
            <div className="flex flex-wrap gap-4 mb-4 text-sm">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1 text-blue-600" />
                <span>{apartments[selectedApartment].location}</span>
              </div>
              <div className="flex items-center">
                <HomeIcon size={16} className="mr-1 text-blue-600" />
                <span>{t.distance}: {apartments[selectedApartment].distance}</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="mr-1 text-yellow-500" />
                <span>{apartments[selectedApartment].rating} ({apartments[selectedApartment].reviews} {t.reviews})</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="bg-blue-50 px-3 py-1 rounded-full">
                {apartments[selectedApartment].bedrooms} {t.bedrooms}
              </div>
              <div className="bg-blue-50 px-3 py-1 rounded-full">
                {apartments[selectedApartment].bathrooms} {t.bathrooms}
              </div>
              <div className="bg-blue-50 px-3 py-1 rounded-full">
                {apartments[selectedApartment].size}
              </div>
            </div>
          </div>
          
          {/* Tabs for Details */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex overflow-x-auto">
              {['overview', 'features', 'nearby', 'calendar'].map((tab) => (
                <button 
                  key={tab}
                  className={`px-4 py-2 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {t[tab]}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === 'overview' && (
              <div>
                <p className="mb-4">
                  {showFullDescription 
                    ? apartments[selectedApartment].description
                    : apartments[selectedApartment].description.split('\n\n')[0]
                  }
                </p>
                {apartments[selectedApartment].description.includes('\n\n') && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 font-medium"
                  >
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            )}
            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-semibold mb-3">{t.amenities}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {apartments[selectedApartment].amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center bg-blue-50 p-2 rounded">
                      {index % 4 === 0 && <Wifi size={18} className="mr-2 text-blue-600" />}
                      {index % 4 === 1 && <Coffee size={18} className="mr-2 text-blue-600" />}
                      {index % 4 === 2 && <HomeIcon size={18} className="mr-2 text-blue-600" />}
                      {index % 4 === 3 && <Car size={18} className="mr-2 text-blue-600" />}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'nearby' && <NearbyAttractions nearby={nearby} t={t} />}
            {activeTab === 'calendar' && <CalendarComponent apartment={apartments[selectedApartment]} t={t} language={language} />}
          </div>
        </div>
        
        {/* Right Column - Booking Card */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>{t.priceDetails}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">{apartments[selectedApartment].price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700">
                  {t.book}
                </button>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{t.contactTitle}</h3>
                <div className="flex items-center">
                  <Phone size={18} className="mr-2 text-blue-600" />
                  <span>{contact.phone}</span>
                </div>
                <p className="text-sm text-gray-500">{t.callHours}: {contact.callHours}</p>
                <p className="text-sm text-gray-500">{t.viewingArrange}</p>
                <p className="text-sm text-gray-500">{t.phoneOnlyNote}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t.cancelPolicy}</h3>
                <p className="text-sm text-gray-500">Free cancellation up to 24 hours before check-in</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-8">
        {t.footer}
      </footer>
    </div>
  );
}