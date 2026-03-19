'use client'

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default icon issue in Next.js
const defaultIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="
    width: 12px; height: 12px; 
    background: #DC2626; 
    border: 2px solid white; 
    border-radius: 50%; 
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
})

const landmarkIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="
    width: 10px; height: 10px; 
    background: #2563EB; 
    border: 2px solid white; 
    border-radius: 50%; 
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [10, 10],
  iconAnchor: [5, 5],
})

// Barrios populares (approximate coordinates)
const barriosPopulares = [
  { name: 'Barrio Darío Santillán', lat: -37.3450, lng: -59.1180, families: '~200', since: '2011', note: 'Terrenos fiscales, en proceso de regularización dominial' },
  { name: 'Villa Cordobita', lat: -37.3380, lng: -59.1050, families: '~150', since: '2015', note: 'Hubo intentos de desalojo y negociaciones' },
  { name: 'Barrio Movediza II', lat: -37.3100, lng: -59.1250, families: '~120', since: '2010s', note: 'Cisterna en construcción desde 2021' },
  { name: 'Barrio Tarraubella', lat: -37.3520, lng: -59.1350, families: '~100', since: '2010s', note: 'Plan de mejoramiento barrial aprobado 2022' },
  { name: 'Asentamiento Palermo', lat: -37.3280, lng: -59.0950, families: '~80', since: '2020', note: 'Negociaciones para evitar consolidación' },
  { name: 'Barrio Las Tunitas', lat: -37.3150, lng: -59.1400, families: '~90', since: '2010s', note: 'Sin acceso a agua corriente ni gas natural' },
]

// Key landmarks
const landmarks = [
  { name: 'UNICEN - Sede Central', lat: -37.3217, lng: -59.1332 },
  { name: 'Parque Industrial', lat: -37.2850, lng: -59.1100 },
  { name: 'Centro de Tandil', lat: -37.3270, lng: -59.1370 },
]

// Approximate Ruta 226 path through Tandil
const ruta226 = [
  [-37.2900, -59.1800],
  [-37.3000, -59.1600],
  [-37.3100, -59.1450],
  [-37.3200, -59.1350],
  [-37.3300, -59.1200],
  [-37.3400, -59.1000],
  [-37.3500, -59.0800],
] as [number, number][]

// Approximate rail line
const ferrocarril = [
  [-37.2950, -59.1700],
  [-37.3050, -59.1500],
  [-37.3150, -59.1380],
  [-37.3250, -59.1300],
  [-37.3350, -59.1150],
  [-37.3450, -59.1000],
] as [number, number][]

type LayerKey = 'barrios' | 'rutas' | 'landmarks'

export default function TandilMap() {
  const [activeLayers, setActiveLayers] = useState<Set<LayerKey>>(
    new Set(['barrios', 'rutas', 'landmarks'] as LayerKey[])
  )

  const toggleLayer = (layer: LayerKey) => {
    setActiveLayers(prev => {
      const next = new Set(prev)
      if (next.has(layer)) next.delete(layer)
      else next.add(layer)
      return next
    })
  }

  return (
    <div className="relative">
      {/* Layer controls */}
      <div className="absolute top-3 right-3 z-[1000] bg-dark/90 backdrop-blur-sm rounded-lg p-3 space-y-2 border border-white/10">
        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Capas</p>
        {[
          { key: 'barrios' as LayerKey, label: 'Barrios populares', color: '#DC2626' },
          { key: 'rutas' as LayerKey, label: 'Ruta 226 / FFCC', color: '#D97706' },
          { key: 'landmarks' as LayerKey, label: 'Referencias', color: '#2563EB' },
        ].map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => toggleLayer(key)}
            className={`flex items-center gap-2 text-xs transition-opacity ${
              activeLayers.has(key) ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <span
              className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0"
              style={{ background: activeLayers.has(key) ? color : 'transparent' }}
            />
            <span className="text-white/80 whitespace-nowrap">{label}</span>
          </button>
        ))}
      </div>

      <MapContainer
        center={[-37.327, -59.133]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[400px] md:h-[500px] w-full"
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Ruta 226 */}
        {activeLayers.has('rutas') && (
          <>
            <Polyline
              positions={ruta226}
              pathOptions={{ color: '#D97706', weight: 3, opacity: 0.7, dashArray: '8 4' }}
            />
            <Polyline
              positions={ferrocarril}
              pathOptions={{ color: '#D97706', weight: 2, opacity: 0.5, dashArray: '4 6' }}
            />
          </>
        )}

        {/* Barrios populares */}
        {activeLayers.has('barrios') && barriosPopulares.map((barrio, i) => (
          <Marker key={i} position={[barrio.lat, barrio.lng]} icon={defaultIcon}>
            <Popup>
              <div className="min-w-[180px]">
                <h4 className="font-semibold text-sm mb-1">{barrio.name}</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <p><span className="font-medium">Familias:</span> {barrio.families}</p>
                  <p><span className="font-medium">Desde:</span> {barrio.since}</p>
                  <p className="text-gray-500 italic">{barrio.note}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Landmarks */}
        {activeLayers.has('landmarks') && landmarks.map((lm, i) => (
          <Marker key={i} position={[lm.lat, lm.lng]} icon={landmarkIcon}>
            <Popup>
              <span className="text-sm font-medium">{lm.name}</span>
            </Popup>
          </Marker>
        ))}

        {/* Urban expansion zones (subtle circles) */}
        <CircleMarker
          center={[-37.345, -59.115]}
          radius={40}
          pathOptions={{ color: '#DC2626', fillColor: '#DC2626', fillOpacity: 0.05, weight: 1, opacity: 0.2 }}
        />
        <CircleMarker
          center={[-37.305, -59.14]}
          radius={30}
          pathOptions={{ color: '#D97706', fillColor: '#D97706', fillOpacity: 0.05, weight: 1, opacity: 0.2 }}
        />
      </MapContainer>
    </div>
  )
}
