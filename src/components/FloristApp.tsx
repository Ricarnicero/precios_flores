import React, { useState } from 'react';
import CostCalculator from './CostCalculator';
import ProductCreator from './ProductCreator';
import ProductPreview from './ProductPreview';

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

export default function FloristApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [flowerData, setFlowerData] = useState<FlowerData | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);

  const handleFlowerDataSubmit = (data: FlowerData) => {
    setFlowerData(data);
    setCurrentStep(2);
  };

  const handleProductDataSubmit = (data: ProductData) => {
    setProductData(data);
    setCurrentStep(3);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFlowerData(null);
    setProductData(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🌸 Florista - Calculadora
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calcula precios y crea contenido para redes sociales
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step <= currentStep
                    ? 'bg-primary-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <CostCalculator onSubmit={handleFlowerDataSubmit} />
        )}

        {currentStep === 2 && flowerData && (
          <ProductCreator 
            flowerData={flowerData}
            onSubmit={handleProductDataSubmit}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && flowerData && productData && (
          <ProductPreview
            flowerData={flowerData}
            productData={productData}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
