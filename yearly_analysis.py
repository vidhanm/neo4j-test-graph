import csv
from collections import defaultdict
from datetime import datetime

def analyze_papers_by_year(filename='arxiv_papers_filtered.csv'):
    """
    Analyze papers by year and their categories
    Args:
        filename: Name of the CSV file to read
    Returns:
        yearly_counts: Dictionary with years and total paper counts
        yearly_category_counts: Dictionary with years and their category distributions
    """
    yearly_counts = defaultdict(int)
    yearly_category_counts = defaultdict(lambda: defaultdict(int))
    
    with open(filename, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Extract year from update_date
            if 'update_date' in row and row['update_date']:
                try:
                    year = datetime.strptime(row['update_date'], '%Y-%m-%d').year
                    # Increment total papers for this year
                    yearly_counts[year] += 1
                    
                    # Process categories for this paper
                    if 'categories' in row and row['categories']:
                        categories = row['categories'].split(',')
                        for category in categories:
                            # Split combined categories
                            individual_categories = category.strip().split()
                            for cat in individual_categories:
                                yearly_category_counts[year][cat] += 1
                                
                except ValueError:
                    print(f"Warning: Invalid date format in row: {row['update_date']}")
                    continue
    
    return yearly_counts, yearly_category_counts

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

if __name__ == "__main__":
    # Analyze papers by year
    yearly_counts, yearly_category_counts = analyze_papers_by_year()
    
    # Print statistics
    print_yearly_statistics(yearly_counts, yearly_category_counts)
    
    # Save statistics to CSV files
    save_yearly_statistics(yearly_counts, yearly_category_counts)
    print("\nYearly statistics have been saved to 'yearly_totals.csv' and 'yearly_category_counts.csv'") 