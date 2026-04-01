import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";

export default function Index() {
    const router = useRouter()
    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full" />
            <ScrollView className="flex-1 px-5"> 
                <Image source={icons.logo} className="w-[58px] h-[44px] mt-20 mb-5 mx-auto" />
                <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie or tv show" />
            </ScrollView>
        </View>
    );
}
