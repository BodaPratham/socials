import CreatorPro from './CreatorPro';
// import ArkCurate from './ArkCurate'; // Make sure you have this file
import MinimalModern from './MinimalModern';
import CafeRestaurant from './CafeRestaurant';
import BrandCommerce from './BrandCommerce';
import ElegantWellness from './ElegantWellness';
import ProfessionalPortfolio from './ProfessionalPortfolio';

export function RenderTemplate({ templateId, data }: { templateId: string, data: any }) {
  // This ensures the live page knows which file to load based on the ID in the database
  switch (templateId) {
    case 'creator-pro':
      return <CreatorPro {...data} />;
    case 'ark-curate':
      // return <ArkCurate {...data} />;
    case 'cafe-restaurant':
      return <CafeRestaurant {...data} />;
    case 'brand-commerce':
      return <BrandCommerce {...data} />;
    case 'elegant-wellness':
      return <ElegantWellness {...data} />;
    case 'professional-portfolio':
      return <ProfessionalPortfolio {...data} />;
    case 'minimal-modern':
    default:
      return <MinimalModern {...data} />;
  }
}