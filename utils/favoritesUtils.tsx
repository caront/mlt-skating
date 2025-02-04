import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "rink_favorites";

export const saveFavoriteStatus = async (rinkId: number, isFavorite: boolean) => {
    try {
        const favorites = await getFavorites();
        if (isFavorite) {
            favorites[rinkId] = true;
        } else {
            delete favorites[rinkId];
        }
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error("Error saving favorite status:", error);
    }
};

export const getFavorites = async (): Promise<{ [key: number]: boolean }> => {
    try {
        const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : {};
    } catch (error) {
        console.error("Error retrieving favorites:", error);
        return {};
    }
};
export const isRinkFavorite = async (rinkId: number): Promise<boolean> => {
    const favorites = await getFavorites();
    return !!favorites[rinkId];
};
