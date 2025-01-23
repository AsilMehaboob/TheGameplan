import requests
from bs4 import BeautifulSoup
import pandas as pd

# Base URL
BASE_URL = "https://www.ea.com/games/ea-sports-fc/ratings"

# List to store scraped data
players_data = []

def scrape_page(url):
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to retrieve {url}")
        return None
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find player cards or elements (adjust selectors as per site structure)
    player_cards = soup.find_all('div', class_='rating-card')
    
    for card in player_cards:
        # Adjust selectors as per the site's HTML structure
        name = card.find('h3', class_='player-name').text.strip() if card.find('h3', class_='player-name') else None
        rating = card.find('div', class_='player-rating').text.strip() if card.find('div', class_='player-rating') else None
        position = card.find('div', class_='player-position').text.strip() if card.find('div', class_='player-position') else None

        players_data.append({
            'Name': name,
            'Rating': rating,
            'Position': position,
        })

# Iterate over pages (adjust range and URL structure based on pagination)
for page in range(1, 11):  # Example: scraping 10 pages
    page_url = f"{BASE_URL}?page={page}"  # Adjust based on actual pagination structure
    print(f"Scraping: {page_url}")
    scrape_page(page_url)

# Save to Excel
df = pd.DataFrame(players_data)
df.to_excel('ea_sports_fc_ratings.xlsx', index=False)

print("Scraping completed. Data saved to 'ea_sports_fc_ratings.xlsx'")
