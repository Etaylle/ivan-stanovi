'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedApartment, setSelectedApartment] = useState(0);
  
  // Apartment data
  const apartments = [
    {
      id: 1,
      name: "Cozy Downtown Apartment",
      price: "$1,200/month",
      bedrooms: 2,
      bathrooms: 1,
      size: "850 sq ft",
      amenities: ["Air Conditioning", "High-Speed Internet", "Dishwasher", "Laundry in Building", "Parking Space"],
      description: "A charming and well-maintained apartment in the heart of downtown. Walking distance to restaurants, shops, and public transportation.",
      images: [
        "/placeholder1.jpg",
        "/placeholder2.jpg",
        "/placeholder3.jpg"
      ],
      availability: {
        // Example data - you would update this as needed
        available: ["2025-03-10", "2025-03-11", "2025-03-12"],
        booked: ["2025-03-15", "2025-03-16", "2025-03-17", "2025-03-18"]
      }
    },
    {
      id: 2,
      name: "Spacious Garden View Apartment",
      price: "$1,450/month",
      bedrooms: 3,
      bathrooms: 2,
      size: "1100 sq ft",
      amenities: ["Balcony", "Garden View", "In-unit Washer/Dryer", "Stainless Steel Appliances", "Central Heating"],
      description: "A bright and spacious apartment overlooking our beautifully maintained garden. Enjoy peaceful mornings and evenings on your private balcony.",
      images: [
        "/placeholder1.jpg",
        "/placeholder2.jpg",
        "/placeholder3.jpg"
      ],
      availability: {
        available: ["2025-03-09", "2025-03-10", "2025-03-11"],
        booked: ["2025-03-20", "2025-03-21", "2025-03-22", "2025-03-23"]
      }
    }
  ];

  // Contact information
  const contactInfo = {
    phone: "(555) 123-4567",
    callHours: "9:00 AM - 6:00 PM, Monday to Friday"
  };

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
    
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Availability Calendar (March 2025)</h3>
        <div className="flex flex-wrap">
          {days}
        </div>
        <div className="flex mt-2 text-sm">
          <div className="flex items-center mr-4">
            <div className="w-4 h-4 bg-green-200 mr-1"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-200 mr-1"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Luxury Apartments for Rent</h1>
        <p className="text-xl text-gray-600">Find your perfect home in our beautiful properties</p>
      </header>

      {/* Apartment Selection Tabs */}
      <div className="flex mb-8">
        {apartments.map((apartment, index) => (
          <button
            key={apartment.id}
            className={`px-6 py-3 font-medium text-lg mr-2 rounded-t-lg ${
              selectedApartment === index 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => {
              setSelectedApartment(index);
              setCurrentSlide(0);
            }}
          >
            {apartment.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Image Carousel */}
        <div className="md:w-1/2 relative">
          <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
            {/* Note: Using div with background instead of Next.js Image for placeholder */}
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
          <div className="flex justify-center mt-4">
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
        </div>
        
        {/* Right Column - Details */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">{apartments[selectedApartment].name}</h2>
          <p className="text-xl text-blue-600 font-semibold mb-4">{apartments[selectedApartment].price}</p>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-gray-100 px-3 py-1 rounded">
              {apartments[selectedApartment].bedrooms} Bedrooms
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded">
              {apartments[selectedApartment].bathrooms} Bathrooms
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded">
              {apartments[selectedApartment].size}
            </div>
          </div>
          
          <p className="mb-4">{apartments[selectedApartment].description}</p>
          
          <h3 className="text-lg font-semibold mb-2">Amenities</h3>
          <ul className="grid grid-cols-2 gap-2 mb-6">
            {apartments[selectedApartment].amenities.map((amenity, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                {amenity}
              </li>
            ))}
          </ul>
          
          {/* Contact Information */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2">Contact Us to Arrange a Viewing</h3>
            <p className="text-blue-800 font-bold text-xl">{contactInfo.phone}</p>
            <p className="text-sm text-gray-600">Call hours: {contactInfo.callHours}</p>
            <p className="text-sm italic mt-2">Note: Apartment viewings are arranged by phone call only</p>
          </div>
          
          {/* Calendar */}
          {renderCalendar()}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600">
        <p>© 2025 Luxury Apartments. All rights reserved.</p>
      </footer>
    </div>
  );
}