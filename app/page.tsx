'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Star, Coffee, Wifi, Car, ShoppingBag, HomeIcon } from 'lucide-react';

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

// Calendar Component Props
interface CalendarProps {
  apartment: Apartment;
  t: Translations[LanguageCode];
  language: LanguageCode;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedApartment, setSelectedApartment] = useState(0);
  const [language, setLanguage] = useState<LanguageCode>('sr');
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Multilingual content (unchanged)
  const translations: Translations = {
    en: {
      title: "Apartments for Rent in Vrnjacka Banja",
      subtitle: "Find your perfect home in our beautiful properties",
      contactTitle: "Contact Information",
      callHours: "Call hours",
      viewingArrange: "Contact Us to Arrange a Viewing",
      phoneOnlyNote: "Note: Apartment viewings are arranged by phone call only",
      calendar: "Availability Calendar",
      available: "Available",
      booked: "Booked",
      pending: "Pending",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      amenities: "Amenities",
      location: "Location",
      distance: "Distance to center",
      rating: "Rating",
      reviews: "reviews",
      book: "Book Now",
      contact: "Contact Host",
      overview: "Overview",
      features: "Features",
      nearby: "Nearby",
      tourismSpots: "Tourist Attractions",
      restaurants: "Restaurants & Cafes",
      shopping: "Shopping",
      transportation: "Transportation",
      priceDetails: "Price Details",
      cancelPolicy: "Cancellation Policy",
      footer: "© 2025 Luxury Apartments. All rights reserved.",
      toggleLanguage: "Srpski"
    },
    sr: {
      title: "Apartmani za Izdavanje u Vrnjačkoj Banji",
      subtitle: "Pronađite savršen smeštaj da upotpunite Vaš doživljaj tokom boravka",
      contactTitle: "Kontakt Informacije",
      callHours: "Radno vreme za pozive",
      viewingArrange: "Kontaktirajte nas da zakažete razgledanje",
      phoneOnlyNote: "Napomena: Razgledanje apartmana se zakazuje isključivo telefonom",
      calendar: "Kalendar dostupnosti",
      available: "Slobodno",
      booked: "Zauzeto",
      pending: "Na čekanju",
      bedrooms: "Spavaće sobe",
      bathrooms: "Kupatila",
      amenities: "Pogodnosti",
      location: "Lokacija",
      distance: "Udaljenost od centra",
      rating: "Ocena",
      reviews: "recenzija",
      book: "Rezerviši odmah",
      contact: "Kontaktirajte domaćina",
      overview: "Pregled",
      features: "Karakteristike",
      nearby: "U blizini",
      tourismSpots: "Turističke atrakcije",
      restaurants: "Restorani i kafići",
      shopping: "Kupovina",
      transportation: "Prevoz",
      priceDetails: "Detalji cene",
      cancelPolicy: "Politika otkazivanja",
      footer: "© 2025 Luksuzni Apartmani. Sva prava zadržana.",
      toggleLanguage: "English"
    }
  };

  // Apartment data (unchanged)
  const apartmentsData: { [key in LanguageCode]: Apartment[] } = {
    en: [
      {
        id: 1,
        name: "Cozy Downtown Apartment",
        price: "22 €/day",
        location: "Central Vrnjacka Banja, Park View Street",
        distance: "400m",
        rating: 4.8,
        reviews: 124,
        bedrooms: 2,
        bathrooms: 1,
        size: "80 m²",
        amenities: ["Air Conditioning", "High-Speed Internet", "Dishwasher", "Laundry in Building", "Parking Space", "Smart TV", "Coffee Machine", "Balcony"],
        description: "A charming and well-maintained apartment in the heart of downtown. Walking distance to restaurants, shops, and public transportation.\n\nThis beautiful property features modern amenities while maintaining the authentic charm of Vrnjacka Banja.",
        images: [  "/images/2.jpg",
          "/images/3.jpg",
          "/images/4.jpg"],
        availability: {
          available: ["2025-03-10", "2025-03-11", "2025-03-12", "2025-03-13", "2025-03-14"],
          booked: ["2025-03-15", "2025-03-16", "2025-03-17", "2025-03-18", "2025-03-19"]
        }
      },
      // ... (other apartments unchanged)
    ],
    sr: [
      {
        id: 1,
        name: "Udoban Apartman u Centru",
        price: "22 €/dan",
        location: "Centralna Vrnjačka Banja, Ulica sa pogledom na park",
        distance: "400m",
        rating: 4.8,
        reviews: 124,
        bedrooms: 2,
        bathrooms: 1,
        size: "80 m²",
        amenities: ["Klima uređaj", "Brzi internet", "Mašina za sudove", "Vešernica u zgradi", "Parking mesto", "Smart TV", "Aparat za kafu", "Balkon"],
        description: "Šarmantan i dobro održavan apartman u srcu grada. Restorani, prodavnice i javni prevoz na pešačkoj udaljenosti.\n\nOva prelepa nekretnina sadrži moderne pogodnosti uz očuvanje autentičnog šarma Vrnjačke Banje.",
        images: [  "/images/2.jpg",
          "/images/3.jpg",
          "/images/4.jpg"],
        availability: {
          available: ["2025-03-10", "2025-03-11", "2025-03-12", "2025-03-13", "2025-03-14"],
          booked: ["2025-03-15", "2025-03-16", "2025-03-17", "2025-03-18", "2025-03-19"]
        }
      },
      // ... (other apartments unchanged)
    ]
  };

  // Nearby attractions and contact info (unchanged)
  const nearbyAttractions = {
    en: {
      tourism: ["Vrnjacka Banja Park - 5 min walk", "Japanese Garden - 10 min walk", "Mineral Springs - 7 min walk"],
      restaurants: ["La Dolce Vita - 3 min walk", "Traditional Serbian Cuisine - 8 min walk", "Coffee & Cakes - 2 min walk"],
      shopping: ["Local Market - 6 min walk", "Souvenir Shops - 5 min walk", "Supermarket - 4 min walk"],
      transportation: ["Bus Station - 12 min walk", "Taxi Stand - 3 min walk", "Bike Rental - 5 min walk"]
    },
    sr: {
      tourism: ["Park Vrnjačke Banje - 5 min hoda", "Japanski vrt - 10 min hoda", "Mineralni izvori - 7 min hoda"],
      restaurants: ["La Dolce Vita - 3 min hoda", "Tradicionalna srpska kuhinja - 8 min hoda", "Kafa i Kolači - 2 min hoda"],
      shopping: ["Lokalna pijaca - 6 min hoda", "Prodavnice suvenira - 5 min hoda", "Supermarket - 4 min hoda"],
      transportation: ["Autobuska stanica - 12 min hoda", "Taksi stajalište - 3 min hoda", "Iznajmljivanje bicikala - 5 min hoda"]
    }
  };

  const contactInfo = {
    en: {
      phone: "(+381) 123-4567",
      callHours: "9:00 AM - 6:00 PM, Monday to Friday",
      host: "Milan Petrović",
      responseTime: "Usually responds within 1 hour"
    },
    sr: {
      phone: "+381 11 123-4567",
      callHours: "9:00 - 18:00, Ponedeljak do Petak",
      host: "Milan Petrović",
      responseTime: "Obično odgovara u roku od 1 sat"
    }
  };

  const t = translations[language];
  const apartments = apartmentsData[language];
  const contact = contactInfo[language];
  const nearby = nearbyAttractions[language];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === apartments[selectedApartment].images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? apartments[selectedApartment].images.length - 1 : prev - 1
    );
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sr' : 'en');
  };

  // Calendar Component
  const CalendarComponent: React.FC<CalendarProps> = ({ apartment, t, language }) => {
    const [viewMonth, setViewMonth] = useState(new Date().getMonth());
    const [viewYear, setViewYear] = useState(new Date().getFullYear());

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

    const monthNames = {
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      sr: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"]
    };

    const prevMonth = () => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear(viewYear - 1);
      } else {
        setViewMonth(viewMonth - 1);
      }
    };

    const nextMonth = () => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear(viewYear + 1);
      } else {
        setViewMonth(viewMonth + 1);
      }
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
          <h3 className="text-lg font-semibold">
            {monthNames[language][viewMonth]} {viewYear}
          </h3>
          <button onClick={nextMonth} className="text-blue-600 hover:text-blue-800">
            {language === 'en' ? 'Next' : 'Sled'} &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 mb-2">
          {weekDays[language].map((day, index) => (
            <div key={index} className="text-center text-sm font-medium">
              {day}
            </div>
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

  const renderNearbyAttractions = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <h4 className="text-md font-semibold mb-2 flex items-center">
            <Star size={18} className="mr-2 text-blue-600" />
            {t.tourismSpots}
          </h4>
          <ul className="space-y-2">
            {nearby.tourism.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full mr-2"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2 flex items-center">
            <Coffee size={18} className="mr-2 text-blue-600" />
            {t.restaurants}
          </h4>
          <ul className="space-y-2">
            {nearby.restaurants.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full mr-2"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2 flex items-center">
            <ShoppingBag size={18} className="mr-2 text-blue-600" />
            {t.shopping}
          </h4>
          <ul className="space-y-2">
            {nearby.shopping.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full mr-2"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2 flex items-center">
            <Car size={18} className="mr-2 text-blue-600" />
            {t.transportation}
          </h4>
          <ul className="space-y-2">
            {nearby.transportation.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full mr-2"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleLanguage}
          className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-700"
        >
          {t.toggleLanguage}
        </button>
      </div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">{t.title}</h1>
        <p className="text-xl text-gray-600">{t.subtitle}</p>
      </header>
      <div className="flex mb-8 overflow-x-auto">
        {apartments.map((apartment, index) => (
          <button
            key={apartment.id}
            className={`px-6 py-3 font-medium text-lg mr-2 rounded-t-lg whitespace-nowrap ${
              selectedApartment === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
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
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            >
              →
            </button>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {currentSlide + 1} / {apartments[selectedApartment].images.length}
            </div>
          </div>
          <div className="flex justify-center mt-4 mb-6">
            {apartments[selectedApartment].images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
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
          <div className="border-b border-gray-200 mb-6">
            <div className="flex overflow-x-auto">
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('overview')}
              >
                {t.overview}
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'features' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('features')}
              >
                {t.features}
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'nearby' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('nearby')}
              >
                {t.nearby}
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'calendar' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('calendar')}
              >
                {t.calendar}
              </button>
            </div>
          </div>
          <div className="mb-8">
            {activeTab === 'overview' && (
              <div>
                <p className="mb-4 whitespace-pre-line">
                  {showFullDescription
                    ? apartments[selectedApartment].description
                    : apartments[selectedApartment].description.split('\n\n')[0]}
                </p>
                {apartments[selectedApartment].description.includes('\n\n') && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            )}
            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-semibold mb-3">{t.amenities}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            {activeTab === 'nearby' && renderNearbyAttractions()}
            {activeTab === 'calendar' && (
              <CalendarComponent
                apartment={apartments[selectedApartment]}
                t={t}
                language={language}
              />
            )}
          </div>
        </div>
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
      <footer className="text-center text-sm text-gray-500 mt-8">{t.footer}</footer>
    </div>
  );
}