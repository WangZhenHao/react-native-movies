import React from 'react';
// import { StyleSheet, Text, View } from 'react-native'
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const TrendingCard = ({
    id,
    title,
    poster_path,
    vote_average,
    release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
                <TouchableOpacity className="w-[112px]">
                    <Image
                        source={{
                            uri: poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                        }}
                        className="w-full h-44 rounded-lg"
                        resizeMode="cover"
                    />
                    <Text className="text-white text-sm" numberOfLines={1}>{title}</Text>
                    <View className="flex-row items-center justify-start">
                        <Image source={icons.star} className="size-4"></Image>
                        <Text className="text-white text-sm ml-1">{Math.round(vote_average / 2)}</Text>
                    </View>
                    <View>
                        <Text className="text-light-300 text-xs">{release_date?.split('-')[0]}</Text>
                    </View>
                </TouchableOpacity>
            </Link>
  )
}

export default TrendingCard

const styles = StyleSheet.create({})