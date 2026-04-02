import { icons } from "@/constants/icons";
import { getMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieInfoProps {
    lable: string;
    value?: string | number | null;
}

const MovieInfo = ({ lable, value }: MovieInfoProps) => {
    return (
        <View className="flex items-start justify-center mt-5">
            <Text className="text-light-200 text-sm pb-1">{lable}</Text>
            <Text className="text-light-100 font-bold text-sm">
                {value || "N/A"}
            </Text>
        </View>
    );
};
const Details = () => {
    const { id } = useLocalSearchParams();

    const {
        data: movie,
        loading,
        error,
    } = useFetch(() => getMovieDetails(id as string));
    return (
        <View className="flex-1 bg-primary">
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
            >
                {loading && (
                    <>
                        <View className="mt-20">
                            <ActivityIndicator size="large" color="white" />
                        </View>
                    </>
                )}
                <View>
                    <Image
                        resizeMode="stretch"
                        className="w-full h-[550px]"
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
                        }}
                    />
                </View>
                <View className="mt-5 px-5 flex items-start">
                    <Text className="text-white font-bold text-xl">
                        {movie?.title}
                    </Text>

                    <View className="flex-row items-center mt-2 gap-x-1">
                        <Text className="text-light-200">
                            {movie?.release_date?.split("-")[0]}
                        </Text>
                        <Text className="text-light-200">
                            {movie?.runtime}m
                        </Text>
                    </View>

                    <View className="flex-row items-center mt-2 gap-x-1 px-2 py-1 bg-dark-100 rounded-md">
                        <Image source={icons.star} className="size-4"></Image>
                        <Text className="text-white font-bold text-sm">
                            {Math.round(movie?.vote_average ?? 0)}/10
                        </Text>
                        <Text className="text-light-200 text-sm">
                            ({movie?.vote_count} votes)
                        </Text>
                    </View>

                    <MovieInfo value={movie?.overview} lable="Overview" />
                    <MovieInfo value={movie?.genres?.map(g => g.name).join('-') || 'N/A'} lable="Genres" />

                    <View className="flex-row justify-between w-1/2">
                       <MovieInfo value={`$${(movie?.budget || 0) / 1_000_000} million`} lable="Budget" />
                       <MovieInfo value={`$${(movie?.revenue || 0) / 1_000_000} million`} lable="Revenue" />
                    </View>

                    <MovieInfo value={movie?.production_companies?.map(g => g.name).join(' - ') || 'N/A'} lable="Production Companies" />
                </View>
            </ScrollView>
            <TouchableOpacity onPress={router.back} className="absolute bottom-5 left-0 right-0 bg-accent flex-row justify-center py-3.5 mx-5 rounded-lg">
              <Image className=" rotate-180 mr-0.5" source={icons.arrow} tintColor={'#fff'}></Image>
              <Text className="text-white">Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Details;

const styles = StyleSheet.create({});
