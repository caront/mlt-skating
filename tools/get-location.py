import requests
import xml.etree.ElementTree as ET
import argparse
import json

# Function to fetch coordinates from Google Maps API
def get_coordinates(address, api_key):
    url = f"https://maps.googleapis.com/maps/api/geocode/json"
    params = {"address": address, "key": api_key}
    response = requests.get(url, params=params)
    data = response.json()
    if data["status"] == "OK":
        location = data["results"][0]["geometry"]["location"]
        return location["lat"], location["lng"]
    else:
        return None, None

# Function to parse rink name into components
def parse_rink_name(rink_name):
    try:
        description, rest = rink_name.split(",", 1)
        name, type_ = rest.rsplit("(", 1)
        name = name.strip()
        type_ = type_.strip(" )")
        return description.strip(), name, type_
    except ValueError:
        # If parsing fails, return the original as the name
        return None, rink_name, None

def main(api_key):
    # URL to fetch skating rink data
    DATA_URL = "https://donnees.montreal.ca/dataset/patinoires/resource/5b1244bd-7b92-436b-8a84-2fab1ea802a4/proxy"

    # Fetch data from the Montreal Open Data API
    response = requests.get(DATA_URL)
    if response.status_code == 200:
        try:
            # Parse the XML response
            root = ET.fromstring(response.content)
        except ET.ParseError as e:
            print(f"Error parsing XML: {e}")
            return
    else:
        print(f"Failed to fetch data. HTTP Status: {response.status_code}")
        return

    # Group rinks by arrondissement.cle
    grouped_data = {}
    for rink in root.findall("patinoire"):
        arr_cle = rink.find("./arrondissement/cle").text
        rink_name = rink.find("nom").text
        arr_name = rink.find("./arrondissement/nom_arr").text

        # Parse the rink name into components
        description, name, type_ = parse_rink_name(rink_name)

        if arr_cle not in grouped_data:
            grouped_data[arr_cle] = {
                "arrondissement": arr_name,
                "rinks": []
            }

        grouped_data[arr_cle]["rinks"].append({
            "name": name,
            "description": description,
            "type": type_,
            "rink_name": rink_name  # Original name for reference
        })

    # Fetch coordinates for each arrondissement and rink
    for arr_cle, data in grouped_data.items():
        print(f"Fetching coordinates for arrondissement: {data['arrondissement']}")
        arr_lat, arr_lng = get_coordinates(data["arrondissement"] + ", Montreal, QC", api_key)
        data["coordinates"] = {"latitude": arr_lat, "longitude": arr_lng}

        for rink in data["rinks"]:
            search_address = f"{rink['name']}, {data['arrondissement']}, Montreal, QC"
            print(f"Fetching coordinates for rink: {rink['rink_name']}")
            rink_lat, rink_lng = get_coordinates(search_address, api_key)
            rink["coordinates"] = {"latitude": rink_lat, "longitude": rink_lng}

    # Save results to a file
    with open("grouped_rink_coordinates.json", "w") as f:
        json.dump(grouped_data, f, indent=4, ensure_ascii=False)

    print("Coordinates saved to grouped_rink_coordinates.json")

if __name__ == "__main__":
    # Set up argument parser
    parser = argparse.ArgumentParser(description="Fetch skating rink coordinates grouped by arrondissement.")
    parser.add_argument("api_key", help="Google Maps API Key")
    args = parser.parse_args()

    # Run the main function with the provided API key
    main(args.api_key)
