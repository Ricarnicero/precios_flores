import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

// Función helper para formatear precios con separadores de miles
const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

interface FlowerData {
  name: string;
  pricePerDozen: number;
  unitPrice: number;
}

interface ProductData {
  name: string;
  image: string;
  description: string;
  salePrice: number;
  flowerQuantity: number;
}

interface Props {
  flowerData: FlowerData;
  productData: ProductData;
  onReset: () => void;
}

export default function ProductPreview({ flowerData, productData, onReset }: Props) {
  const previewRef = useRef<HTMLDivElement>(null);

  // Calcular costos basados en la cantidad de flores utilizadas
  const totalFlowerCost = productData.flowerQuantity * flowerData.unitPrice;
  const profit = productData.salePrice - totalFlowerCost;

  const handleExportPNG = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const link = document.createElement('a');
        link.download = `${productData.name.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error al generar la imagen:', error);
        alert('Error al generar la imagen. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share && previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `${productData.name}.png`, { type: 'image/png' });
            await navigator.share({
              title: productData.name,
              text: productData.description,
              files: [file]
            });
          }
        });
      } catch (error) {
        console.error('Error al compartir:', error);
        handleExportPNG();
      }
    } else {
      handleExportPNG();
    }
  };

  return (
    <div className="space-y-6">
      {/* Vista previa para redes sociales */}
      <div 
        ref={previewRef}
        className="bg-gradient-to-br from-primary-50 to-pink-50 p-8 rounded-2xl shadow-2xl mx-auto max-w-sm"
        style={{ width: '400px', minHeight: '500px' }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {productData.name}
          </h1>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        {/* Imagen del producto */}
        <div className="mb-6">
          <img
            src={productData.image}
            alt={productData.name}
            className="w-full h-48 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <p className="text-gray-700 text-center leading-relaxed">
            {productData.description}
          </p>
        </div>

        {/* Precio */}
        <div className="text-center mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-primary-200">
            <p className="text-primary-600 text-sm font-medium mb-1">Precio de Venta</p>
            <p className="text-3xl font-bold text-primary-900">
              ${formatPrice(productData.salePrice)}
            </p>
          </div>
        </div>

        {/* Footer decorativo */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 text-primary-400">
            <div className="w-8 h-0.5 bg-primary-300 rounded"></div>
            <span className="text-2xl">🌸</span>
            <div className="w-8 h-0.5 bg-primary-300 rounded"></div>
          </div>
          <p className="text-xs text-gray-600 mt-2 font-medium">Claudia Segura</p>
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
            <span>📞</span>
            <span>55 4917 1408</span>
          </p>
        </div>
      </div>

      {/* Controles */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          ¡Listo para compartir! 📱
        </h3>
        
        {/* Información del producto */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Flores utilizadas ({flowerData.name}):</span>
            <span className="font-medium text-gray-900 dark:text-white">{productData.flowerQuantity} unidades</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Costo unitario:</span>
            <span className="font-medium text-gray-900 dark:text-white">${formatPrice(flowerData.unitPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Costo total en flores:</span>
            <span className="font-medium text-gray-900 dark:text-white">${formatPrice(totalFlowerCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Precio de venta:</span>
            <span className="font-medium text-gray-900 dark:text-white">${formatPrice(productData.salePrice)}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-green-600 dark:text-green-400">Ganancia:</span>
            <span className="text-green-700 dark:text-green-300">
              ${formatPrice(profit)}
            </span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <button
            onClick={handleShare}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl"
          >
            <span>📱</span>
            <span>Compartir / Descargar PNG</span>
          </button>
          
          <button
            onClick={onReset}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition-all"
          >
            🔄 Crear Nuevo Producto
          </button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
            💡 La imagen se optimiza automáticamente para redes sociales
          </p>
        </div>
      </div>
    </div>
  );
}
