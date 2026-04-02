import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface Props {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onPress?: () => void;
  }
const SearchBar = ({ onPress, placeholder, value = '', onChangeText }: Props) => {
    return (
        <View className="flex-row items-center bg-dark-200 px-5 rounded-full">
            <Image
                source={icons.search}
                className="size-5"
                tintColor={"#ab8bff"}
            />
            <TextInput
                placeholder={placeholder || "Search"}
                onPress={onPress}
                value={value}
                className="flex-1 ml-2 text-white h-[44px]"
                placeholderTextColor={"#a8b5db"}
                onChangeText={onChangeText}
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({});
