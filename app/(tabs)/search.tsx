import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const search = () => {
    const [serachQuery, setSerachQuery] = useState("");

    const {
        data: movies,
        loading,
        error,
        refetch,
        reset,
    } = useFetch(() => getMovies({ query: serachQuery }), false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (serachQuery.trim()) {
                refetch();
            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [serachQuery]);

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />
            <FlatList
                className="px-5"
                // horizontal
                // scrollEnabled={false}
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    // paddingRight: 5,
                    // marginBlock: 10,
                    marginBottom: 10,
                }}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                ListEmptyComponent={
                  !loading && !error ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-gray-500 text-lg">
                            { serachQuery.trim() ? "No results found" : "Search for a movie" }
                        </Text>
                    </View>
                  ) : null
                }
                ListHeaderComponent={
                    <>
                        <View className="mt-20 flex-row justify-center mb-3">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>
                        <View className="my-5">
                            <SearchBar
                                placeholder="Search for a movie"
                                value={serachQuery}
                                onChangeText={(text) => setSerachQuery(text)}
                            />
                        </View>
                        {loading && (
                            <ActivityIndicator size={"large"} color="#0000ff" />
                        )}
                        {error && (
                            <Text className="text-red-500">
                                {error.message}
                            </Text>
                        )}

                        {!loading &&
                            !error &&
                            serachQuery.trim() &&
                            movies?.length > 0 && (
                                <View className="text-white pb-2.5 text-lg font-bold flex-row">
                                    <Text className="text-white">
                                        Search Results for{" "}
                                    </Text>
                                    <Text className="text-accent">
                                        {serachQuery}
                                    </Text>
                                </View>
                            )}
                    </>
                }
            />
        </View>
    );
};

export default search;

const styles = StyleSheet.create({});
