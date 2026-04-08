import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getMovies2, getPopluarMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
    const router = useRouter();
    const [list, setList] = useState<any[]>([]);

    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError,
        reset: resetTrendingMovies,
        refetch: refetchTrendingMovies,
    } = useFetch(() => getPopluarMovies());
    const formData = useRef({
        page: 1,
        sort_by: "popularity.desc",
    });

    const {
        data: movies,
        loading,
        error,
        refetch,
    } = useFetch(() => {
        return getMovies2(formData.current);
    }, false);

    useEffect(() => {
        if(loading) return
        if(movies && movies.length > 0) {
            setList([...list, ...movies]);
        }
        
    }, [movies]);

    useEffect(() => {
        refetch();
    }, []);

    const refressHanlde = () => {
        setList([]);
        formData.current.page = 1;
        refetch();
        resetTrendingMovies()
        refetchTrendingMovies()
    };

    const onEndReached = () => {
        formData.current.page += 1;
        refetch();
    };

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full" />
            <FlatList
                data={list}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 15,
                    paddingRight: 5,
                    marginBlock: 10,
                }}
                onRefresh={refressHanlde}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingBottom: 100,
                }}
                refreshing={loading}
                onEndReached={onEndReached}
                ListFooterComponent={
                    <View className="flex-row justify-center items-center">
                        {loading ? (
                            <ActivityIndicator size={"large"} color="#fff" />
                        ) : error ? (
                            <Text className="text-white">{error?.message}</Text>
                        ) : null}
                    </View>
                }
                ListHeaderComponent={
                    <>
                        <Image
                            source={icons.logo}
                            className="w-[58px] h-[44px] mt-20 mb-5 mx-auto"
                        />
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search for a movie or tv show"
                        />
                        <View>
                            <Text className="text-lg text-white font-bold mt-5">
                                Top Movies
                            </Text>
                            <FlatList
                                horizontal
                                data={trendingMovies}
                                showsHorizontalScrollIndicator={false}
                                className="mt-2 mb-2"
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TrendingCard {...item} />
                                )}
                                ItemSeparatorComponent={() => (
                                    <View className="w-4" />
                                )}
                                // numColumns={3}
                            ></FlatList>
                        </View>
                        <Text className="text-lg text-white font-bold mt-5">
                            Latest Movies
                        </Text>

                        {error || trendingError ? (
                            <Text className="text-white">
                                {error?.message || trendingError?.message}
                            </Text>
                        ) : null}
                    </>
                }
            />
            {/* <ScrollView
                className="px-5"
                style={
                    {
                        // paddingVertical: 20,
                        // paddingHorizontal: 20
                    }
                }
                contentContainerStyle={{
                    paddingBottom: 10,
                    // minHeight: "100%",
                }}
            >
                <Image
                    source={icons.logo}
                    className="w-[58px] h-[44px] mt-20 mb-5 mx-auto"
                />

                {loading || trendingLoading ? (
                    <ActivityIndicator size={"large"} color="#0000ff" />
                ) : error || trendingError ? (
                    <Text className="text-white">{error?.message || trendingError?.message}</Text>
                ) : (
                    <>
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search for a movie or tv show"
                        />
                        <View>
                            <Text className="text-lg text-white font-bold mt-5">
                                Top Movies
                            </Text>
                            <FlatList
                                horizontal
                                data={trendingMovies}
                                showsHorizontalScrollIndicator={false}

                                className="mt-2 mb-2"
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TrendingCard {...item} />
                                )}
                                ItemSeparatorComponent={() => <View className="w-4" />}
                                // numColumns={3}
                            ></FlatList>
                        </View>
                        <Text className="text-lg text-white font-bold mt-5">
                            Latest Movies
                        </Text>
                        <FlatList
                            className="mt-2 pb-2"
                            // horizontal
                            scrollEnabled={false}
                            data={movies}
                            renderItem={({ item }) => <MovieCard {...item} />}
                            keyExtractor={(item) => item.id}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: "flex-start",
                                gap: 20,
                                paddingRight: 5,
                                marginBlock: 10,
                            }}
                        />
                    </>
                )}
            </ScrollView> */}
        </View>
    );
}
