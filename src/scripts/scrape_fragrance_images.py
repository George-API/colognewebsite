import requests
from bs4 import BeautifulSoup
import csv
import json
import time
import os
from urllib.parse import quote, urlparse
from pathlib import Path

class FragranceScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.results = []
        self.base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
        self.images_dir = os.path.join(self.base_dir, 'public', 'images', 'fragrances')
        Path(self.images_dir).mkdir(parents=True, exist_ok=True)
        
    def load_fragrances(self):
        """Load fragrances from CSV file"""
        fragrances = []
        csv_path = os.path.join(self.base_dir, 'src', 'data', 'products.csv')
        
        try:
            print(f"Looking for CSV at: {csv_path}")
            # Open with utf-8-sig to handle BOM if present
            with open(csv_path, 'r', encoding='utf-8-sig') as file:
                # Skip any empty lines at the start
                content = [line for line in file if line.strip()]
                
            # Reopen and read from start with cleaned content
            reader = csv.DictReader(content)
            for row in reader:
                if 'Brand' in row and 'Fragrance' in row:
                    fragrances.append({
                        'brand': row['Brand'].strip(),
                        'name': row['Fragrance'].strip()
                    })
            
            print(f"Found {len(fragrances)} fragrances in CSV")
            return fragrances
        except FileNotFoundError:
            print(f"Error: Could not find {csv_path}")
            return []
        except Exception as e:
            print(f"Error loading CSV: {str(e)}")
            return []

    def download_image(self, url, brand, name):
        """Download image and save it to the images directory"""
        try:
            response = requests.get(url, headers=self.headers, stream=True)
            if response.status_code == 200:
                # Create a safe filename
                safe_name = f"{brand.lower().replace(' ', '-')}-{name.lower().replace(' ', '-')}"
                # Get file extension from URL or default to .jpg
                ext = os.path.splitext(urlparse(url).path)[1] or '.jpg'
                filename = f"{safe_name}{ext}"
                filepath = os.path.join(self.images_dir, filename)
                
                with open(filepath, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
                
                return f'/images/fragrances/{filename}'
            return None
        except Exception as e:
            print(f"Error downloading image for {brand} {name}: {str(e)}")
            return None

    def search_fragrance(self, brand, name):
        """Search for a specific fragrance and get its image URL"""
        # Clean the search terms
        search_query = f"{brand} {name} perfume bottle"
        encoded_query = quote(search_query)
        
        # Try fragrantica first as it's most reliable
        print("  Checking Fragrantica...")
        fragrantica_url = self.search_fragrantica(brand, name)
        if fragrantica_url:
            print("  ✓ Found on Fragrantica")
            return fragrantica_url

        # Then try Google Images
        print("  Searching Google Images...")
        search_url = f"https://www.google.com/search?q={encoded_query}&tbm=isch"
        
        try:
            response = requests.get(search_url, headers=self.headers)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Look for image URLs in the page source
            page_text = str(soup)
            image_urls = []
            
            # Method 1: Look for "ou" URLs in script tags
            for script in soup.find_all('script'):
                if script.string and '"ou":"' in script.string:
                    content = script.string
                    start = 0
                    while True:
                        start = content.find('"ou":"', start)
                        if start == -1:
                            break
                        start += 6
                        end = content.find('","', start)
                        if end > start:
                            img_url = content[start:end]
                            if self.is_valid_image(img_url, brand, name):
                                image_urls.append(img_url)
                        start = end
            
            # Method 2: Look for image URLs in data-src attributes
            for img in soup.find_all('img', {'data-src': True}):
                img_url = img.get('data-src', '')
                if self.is_valid_image(img_url, brand, name):
                    image_urls.append(img_url)
            
            # Method 3: Look for image URLs in src attributes
            for img in soup.find_all('img', {'src': True}):
                img_url = img.get('src', '')
                if img_url.startswith('http') and self.is_valid_image(img_url, brand, name):
                    image_urls.append(img_url)
            
            # Method 4: Regular expression to find image URLs
            import re
            urls = re.findall(r'https?://[^"\']+?(?:jpg|jpeg|png|webp)', page_text)
            for url in urls:
                if self.is_valid_image(url, brand, name):
                    image_urls.append(url)
            
            # Remove duplicates and get the first valid URL
            image_urls = list(dict.fromkeys(image_urls))
            if image_urls:
                print("  ✓ Found on Google Images")
                return image_urls[0]
                    
        except Exception as e:
            print(f"  ✗ Error searching Google: {str(e)}")
        
        print("  ✗ No image found")
        return None

    def get_official_url(self, brand, name):
        """Try to get image from official brand website"""
        # Map of brand names to their official website patterns
        brand_websites = {
            'Tom Ford': 'https://www.tomford.com/beauty/private-blend/',
            'Amouage': 'https://www.amouage.com/fragrances/',
            'Parfums De Marly': 'https://www.parfums-de-marly.com/collections/',
            'Xerjoff': 'https://xerjoff.com/collections/',
            'Byredo': 'https://www.byredo.com/us_en/fragrances/',
            'Kilian': 'https://www.bykilian.com/products/',
            'Le Labo': 'https://www.lelabofragrances.com/perfume/',
            'Maison Margiela': 'https://www.maisonmargiela-fragrances.us/en/products/',
            'Initio': 'https://initioparfums.com/collections/',
            # Add more brand websites as needed
        }
        
        if brand in brand_websites:
            try:
                response = requests.get(brand_websites[brand], headers=self.headers)
                soup = BeautifulSoup(response.text, 'html.parser')
                # Implementation would depend on each website's structure
                # This is a placeholder for the concept
                return None
            except Exception as e:
                print(f"  ✗ Error accessing official website: {str(e)}")
                return None
        
        return None

    def search_fragrantica(self, brand, name):
        """Search on Fragrantica for the fragrance image"""
        # Try direct URL first
        brand_url = brand.replace(' ', '-').replace('&', 'and')
        name_url = name.replace(' ', '-').replace('(', '').replace(')', '').replace('.', '')
        url = f"https://www.fragrantica.com/perfume/{brand_url}/{name_url}.html"
        
        try:
            response = requests.get(url, headers=self.headers)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                # Try multiple image selectors
                img = (
                    soup.find('img', {'class': 'perfume-presentation'}) or
                    soup.find('img', {'class': 'perfume-big'}) or
                    soup.find('img', {'itemprop': 'image'})
                )
                if img and img.get('src'):
                    return img['src']
                    
            # If direct URL fails, try search
            search_url = f"https://www.fragrantica.com/search/?q={quote(f'{brand} {name}')}"
            response = requests.get(search_url, headers=self.headers)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                img = soup.find('img', {'class': 'perfume-big'})
                if img and img.get('src'):
                    return img['src']
                    
        except Exception as e:
            print(f"  ✗ Error accessing Fragrantica: {str(e)}")
            
        return None

    def is_valid_image(self, url, brand, name):
        """Validate if the image URL is likely to be a product image"""
        try:
            url_lower = url.lower()
            brand_lower = brand.lower()
            name_lower = name.lower().replace(' ', '').replace('-', '')
            
            # Basic validation criteria
            if not url.startswith('http'):
                return False
                
            # Skip small images, thumbnails, or icons
            if any(x in url_lower for x in ['thumb', 'icon', 'small', 'mini', 'avatar']):
                return False
                
            # Skip logos, banners, or ads
            if any(x in url_lower for x in ['logo', 'banner', 'ad', 'promo']):
                return False
                
            # Skip social media and common non-product images
            if any(x in url_lower for x in ['facebook', 'twitter', 'instagram', 'profile']):
                return False
                
            # Ensure URL is from a reputable source or contains brand/name
            trusted_domains = [
                'fragrantica.com', 'parfumo.net', 'sephora.com', 'nordstrom.com',
                'bloomingdales.com', 'saksfifthavenue.com', 'neimanmarcus.com',
                'harrods.com', 'selfridges.com'
            ]
            
            # Accept from trusted domains
            if any(domain in url_lower for domain in trusted_domains):
                return True
                
            # For other domains, require brand name and part of fragrance name
            if brand_lower not in url_lower:
                return False
                
            # Try to match name components (at least one word with 3+ chars)
            name_parts = [part for part in name_lower.split() if len(part) > 2]
            if not any(part in url_lower for part in name_parts):
                return False
                
            return True
            
        except Exception:
            return False

    def scrape_all_fragrances(self):
        """Scrape images for all fragrances"""
        fragrances = self.load_fragrances()
        total = len(fragrances)
        
        print(f"\nStarting to scrape {total} fragrances...\n")
        
        for i, fragrance in enumerate(fragrances, 1):
            print(f"[{i}/{total}] Searching for {fragrance['brand']} {fragrance['name']}...")
            
            image_url = self.search_fragrance(fragrance['brand'], fragrance['name'])
            local_path = None
            
            if image_url:
                print("  Downloading image...")
                local_path = self.download_image(image_url, fragrance['brand'], fragrance['name'])
                if local_path:
                    print("  ✓ Download successful")
                else:
                    print("  ✗ Download failed")
            
            result = {
                'brand': fragrance['brand'],
                'name': fragrance['name'],
                'image_url': image_url,
                'local_path': local_path
            }
            
            self.results.append(result)
            print()  # Empty line for readability
            
            # Be nice to servers
            time.sleep(2)

    def save_results(self):
        """Save results to a JSON file"""
        output_path = os.path.join(self.base_dir, 'src', 'data', 'fragrance_images.json')
        
        try:
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(self.results, f, indent=2)
                
            print(f"\nResults saved to {output_path}")
            print("\nSummary:")
            
            success = len([r for r in self.results if r['local_path']])
            failed = len(self.results) - success
            
            print(f"✓ Successfully downloaded: {success}")
            print(f"✗ Failed to download: {failed}")
            
            if failed > 0:
                print("\nFailed fragrances:")
                for result in self.results:
                    if not result['local_path']:
                        print(f"✗ {result['brand']} {result['name']}")
        except Exception as e:
            print(f"Error saving results: {str(e)}")

def main():
    try:
        scraper = FragranceScraper()
        scraper.scrape_all_fragrances()
        scraper.save_results()
    except KeyboardInterrupt:
        print("\nScript interrupted by user")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")

if __name__ == "__main__":
    main() 