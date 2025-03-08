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

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedApartment, setSelectedApartment] = useState(0);
  const [language, setLanguage] = useState<LanguageCode>('sr');
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Multilingual content
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
  
  // Apartment data with enhanced information
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
        description: "A charming and well-maintained apartment in the heart of downtown. Walking distance to restaurants, shops, and public transportation. This beautiful property features modern amenities while maintaining the authentic charm of Vrnjacka Banja. Enjoy peaceful mornings with a cup of coffee on your private balcony overlooking the central park area.\n\nThe apartment has been recently renovated with high-quality materials and furnishings. The kitchen is fully equipped with all necessary appliances including a dishwasher, microwave, and coffee machine. Both bedrooms feature comfortable queen-sized beds with premium linens and black-out curtains for a perfect night's sleep. The living room has a smart TV with international channels and high-speed internet is available throughout the property.",
        images: [
          "/api/placeholder/800/600",
          "/api/placeholder/800/600",
          "/api/placeholder/800/600"
        ],
        availability: {
          available: ["2025-03-10", "2025-03-11", "2025-03-12", "2025-03-13", "2025-03-14"],
          booked: ["2025-03-15", "2025-03-16", "2025-03-17", "2025-03-18", "2025-03-19"]
        }
      },
      {
        id: 2,
        name: "Spacious Garden View Apartment",
        price: "22 €/day",
        location: "Quiet residential area, Garden Street",
        distance: "800m",
        rating: 4.9,
        reviews: 86,
        bedrooms: 3,
        bathrooms: 2,
        size: "88 m²",
        amenities: ["Balcony", "Garden View", "In-unit Washer/Dryer", "Stainless Steel Appliances", "Central Heating", "Free Parking", "Pet Friendly", "Outdoor Dining Area"],
        description: "A bright and spacious apartment overlooking our beautifully maintained garden. Enjoy peaceful mornings and evenings on your private balcony. This family-friendly property is perfect for longer stays with all the comforts of home.\n\nThe apartment features three well-appointed bedrooms with ample storage space. The master bedroom has an en-suite bathroom with a rainfall shower. The fully equipped kitchen includes high-end stainless steel appliances and everything you need to prepare delicious meals. The spacious living room opens onto a large balcony with garden views, perfect for outdoor dining or relaxing with a book.",
        images: [
          "/api/placeholder/800/600",
          "/api/placeholder/800/600",
          "/api/placeholder/800/600"
        ],
        availability: {
          available: ["2025-03-09", "2025-03-10", "2025-03-11", "2025-03-12", "2025-03-13", "2025-03-14"],
          booked: ["2025-03-20", "2025-03-21", "2025-03-22", "2025-03-23", "2025-03-24"]
        }
      }
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
        description: "Šarmantan i dobro održavan apartman u srcu grada. Restorani, prodavnice i javni prevoz na pešačkoj udaljenosti. Ova prelepa nekretnina sadrži moderne pogodnosti uz očuvanje autentičnog šarma Vrnjačke Banje. Uživajte u mirnim jutrima uz šoljicu kafe na privatnom balkonu sa pogledom na centralni park.\n\nApartman je nedavno renoviran kvalitetnim materijalima i nameštajem. Kuhinja je potpuno opremljena svim potrebnim uređajima uključujući mašinu za sudove, mikrotalasnu i aparat za kafu. Obe spavaće sobe imaju udobne bračne krevete sa premium posteljinom i zavesama koje blokiraju svetlost za savršen san. Dnevna soba ima smart TV sa međunarodnim kanalima, a brzi internet je dostupan u celom objektu.",
        images: [
          "/api/placeholder/800/600",
          "/api/placeholder/800/600",
          "/api/placeholder/800/600"
        ],
        availability: {
          available: ["2025-03-10", "2025-03-11", "2025-03-12", "2025-03-13", "2025-03-14"],
          booked: ["2025-03-15", "2025-03-16", "2025-03-17", "2025-03-18", "2025-03-19"]
        }
      },
      {
        id: 2,
        name: "Prostran Apartman sa Pogledom na Baštu",
        price: "22 €/dan",
        location: "Tihi stambeni deo, Baštenska ulica",
        distance: "800m",
        rating: 4.9,
        reviews: 86,
        bedrooms: 3,
        bathrooms: 2,
        size: "88 m²",
        amenities: ["Balkon", "Pogled na baštu", "Veš mašina/sušilica u stanu", "Uređaji od nerđajućeg čelika", "Centralno grejanje", "Besplatan parking", "Dozvoljeni kućni ljubimci", "Prostor za obedovanje napolju"],
        description: "Svetao i prostran apartman sa pogledom na našu lepo održavanu baštu. Uživajte u mirnim jutrima i večerima na vašem privatnom balkonu. Ova nekretnina pogodna za porodice je savršena za duže boravke sa svim udobnostima doma.\n\nApartman sadrži tri dobro opremljene spavaće sobe sa dovoljno prostora za odlaganje. Glavna spavaća soba ima svoje kupatilo sa tuš kabinom sa efektom kiše. Potpuno opremljena kuhinja uključuje vrhunske uređaje od nerđajućeg čelika i sve što vam je potrebno za pripremu ukusnih obroka. Prostrana dnevna soba se otvara ka velikom balkonu sa pogledom na baštu, savršenim za obedovanje na otvorenom ili opuštanje uz knjigu.",
        images: [
          "/api/placeholder/800/600",
          "/api/placeholder/800/600",
          "/api/placeholder/800/600"
        ],
        availability: {
          available: ["2025-03-09", "2025-03-10", "2025-03-11", "2025-03-12", "2025-03-13", "2025-03-14"],
          booked: ["2025-03-20", "2025-03-21", "2025-03-22", "2025-03-23", "2025-03-24"]
        }
      }
    ]
  };

  // Nearby attractions data
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

  // Contact information
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

  // Current language data
  const t = translations[language];
  const apartments = apartmentsData[language];
  const contact = contactInfo[language];
  const nearby = nearbyAttractions[language];

  // Handle image carousel navigation
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

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sr' : 'en');
  };

  // Simplified calendar component to show availability
  const renderCalendar = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isAvailable = apartments[selectedApartment].availability.available.includes(dateString);
      const isBooked = apartments[selectedApartment].availability.booked.includes(dateString);
      
      let statusClass = "bg-gray-100"; // Default
      if (isAvailable) statusClass = "bg-green-200";
      if (isBooked) statusClass = "bg-red-200";
      
      days.push(
        <div key={i} className={`w-8 h-8 flex items-center justify-center ${statusClass} m-1 rounded`}>
          {i}
        </div>
      );
    }
    
    // Get month name in the current language
    const monthNames = {
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      sr: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"]
    };
    
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">{t.calendar} ({monthNames[language][month]} {year})</h3>
        <div className="flex flex-wrap">
          {days}
        </div>
        <div className="flex mt-2 text-sm">
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

  // Function to render nearby attractions
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
      {/* Language Toggle */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={toggleLanguage}
          className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-700"
        >
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

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Image Carousel and Details */}
        <div className="md:w-2/3">
          {/* Image Carousel */}
          <div className="relative h-96 overflow-hidden rounded-lg shadow-lg mb-6">
            {/* Using placeholder for images */}
            <div 
              style={{
                backgroundImage: `url(${apartments[selectedApartment].images[currentSlide]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%'
              }}
            />
            
            {/* Carousel Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              ←
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              →
            </button>
            
            {/* Image Counter */}
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
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {/* Basic Info Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{apartments[selectedApartment].name}</h2>
            
            {/* Key Features Row */}
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
            
            {/* Property Features */}
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
          
          {/* Tab Content */}
          <div className="mb-8">
            {/* Overview Tab */}
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
            
            {/* Features Tab */}
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
            
            {/* Nearby Tab */}
            {activeTab === 'nearby' && renderNearbyAttractions()}
            
            {/* Calendar Tab */}
            {activeTab === 'calendar' && renderCalendar()}
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
        {t.footer}            </footer>
    </div>
  );
};