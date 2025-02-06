import csv
from collections import defaultdict
from datetime import datetime

def get_main_category(category):
    """
    Extract the main category from a subcategory code
    Example: 'math.FA' -> 'math'
    """
    return category.split('.')[0] if '.' in category else category

def analyze_papers_by_year(filename='arxiv_papers_filtered.csv'):
    """
    Analyze papers by year and their categories, grouping by main categories
    """
    yearly_counts = defaultdict(int)
    yearly_category_counts = defaultdict(lambda: defaultdict(int))
    yearly_subcategory_counts = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))
    
    with open(filename, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if 'update_date' in row and row['update_date']:
                try:
                    year = datetime.strptime(row['update_date'], '%Y-%m-%d').year
                    yearly_counts[year] += 1
                    
                    if 'categories' in row and row['categories']:
                        categories = row['categories'].split(',')
                        for category in categories:
                            individual_categories = category.strip().split()
                            for cat in individual_categories:
                                cat = cat.strip()
                                main_category = get_main_category(cat)
                                yearly_category_counts[year][main_category] += 1
                                yearly_subcategory_counts[year][main_category][cat] += 1
                                
                except ValueError:
                    continue
    
    return yearly_counts, yearly_category_counts, yearly_subcategory_counts

def print_yearly_statistics(yearly_counts, yearly_category_counts):
    """
    Print statistics about papers published each year
    """
    print("\nYearly Paper Statistics:")
    print("-" * 50)
    for year in sorted(yearly_counts.keys()):
        print(f"\nYear {year}:")
        print(f"Total Papers: {yearly_counts[year]}")
        print("\nTop 10 Categories:")
        # Sort categories by count for this year
        sorted_categories = sorted(
            yearly_category_counts[year].items(),
            key=lambda x: (-x[1], x[0])
        )[:10]
        for category, count in sorted_categories:
            print(f"{category}: {count} papers")
    print("-" * 50)

def save_yearly_statistics(yearly_counts, yearly_category_counts):
    """
    Save yearly statistics to CSV files
    """
    # Save yearly totals
    with open('yearly_totals.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Year', 'Total Papers'])
        for year in sorted(yearly_counts.keys()):
            writer.writerow([year, yearly_counts[year]])
    
    # Save detailed category counts by year
    with open('yearly_category_counts.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        # Get all unique categories
        all_categories = set()
        for year_data in yearly_category_counts.values():
            all_categories.update(year_data.keys())
        
        # Write header
        header = ['Year'] + sorted(all_categories)
        writer.writerow(header)
        
        # Write data for each year
        for year in sorted(yearly_category_counts.keys()):
            row = [year]
            for category in header[1:]:  # Skip 'Year' column
                row.append(yearly_category_counts[year][category])
            writer.writerow(row)

def save_interactive_visualization(yearly_counts, yearly_category_counts, yearly_subcategory_counts):
    """
    Save the data in a format suitable for interactive visualization
    """
    # Save the data as JSON for the interactive visualization
    import json
    
    # Prepare the data structure
    visualization_data = {
        'years': sorted(yearly_counts.keys()),
        'categories': {},
    }
    
    # For each main category, collect all its subcategories and their counts
    for year in yearly_subcategory_counts:
        for main_cat in yearly_subcategory_counts[year]:
            if main_cat not in visualization_data['categories']:
                visualization_data['categories'][main_cat] = {
                    'subcategories': {},
                    'total_by_year': defaultdict(int)
                }
            
            # Add the year's data
            visualization_data['categories'][main_cat]['total_by_year'][str(year)] = \
                yearly_category_counts[year][main_cat]
            
            # Add subcategory data
            for subcat, count in yearly_subcategory_counts[year][main_cat].items():
                if subcat not in visualization_data['categories'][main_cat]['subcategories']:
                    visualization_data['categories'][main_cat]['subcategories'][subcat] = {}
                visualization_data['categories'][main_cat]['subcategories'][subcat][str(year)] = count

    # Save the data
    with open('public/visualization_data.json', 'w', encoding='utf-8') as f:
        json.dump(visualization_data, f)

if __name__ == "__main__":
    # Analyze papers by year
    yearly_counts, yearly_category_counts, yearly_subcategory_counts = analyze_papers_by_year()
    
    # Print statistics
    print_yearly_statistics(yearly_counts, yearly_category_counts)
    
    # Save statistics to CSV files
    save_yearly_statistics(yearly_counts, yearly_category_counts)
    print("\nYearly statistics have been saved to 'yearly_totals.csv' and 'yearly_category_counts.csv'")
    
    # Save interactive visualization data
    save_interactive_visualization(yearly_counts, yearly_category_counts, yearly_subcategory_counts)
    print("\nVisualization data has been saved to 'public/visualization_data.json'") 