import fs from 'fs';
import path from 'path';

const templatesDir = path.join(process.cwd(), 'app', 'templates');
const templates = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tsx'));

for (const template of templates) {
  const filePath = path.join(templatesDir, template);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Insert currencySign declaration if it has profile prop
  if (content.includes('profile') && !content.includes('currencySign')) {
    content = content.replace(
      'const config = profile?.design_config || {};',
      'const config = profile?.design_config || {};\n  const currencySign = config.currency || "$";'
    );
  }

  // Replace occurrences in Dhurndhar, CreatorPro, MinimalModern, BrandCommerce
  content = content.replace(/₹\{displayPrice\}/g, '{currencySign}{displayPrice}');
  content = content.replace(/₹\{p\.price\}/g, '{currencySign}{p.price}');
  
  // Replace in CafeRestaurant
  content = content.replace(/\$ \{\(p\.price/g, '{currencySign} {(p.price');
  content = content.replace(/\$ \{\(selectedProduct\.price/g, '{currencySign} {(selectedProduct.price');

  fs.writeFileSync(filePath, content, 'utf-8');
}

console.log('Currency signs updated in templates');
