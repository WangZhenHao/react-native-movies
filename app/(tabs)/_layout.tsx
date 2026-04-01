import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="min-w-[112px] min-h-[55px] flex mt-4 justify-center items-center rounded-full overflow-hidden flex-row"
            >
                <Image source={icon} className="size-5" tintColor={"#151312"} />
                <Text className="text-secondary text-base font-semibold ml-2">
                    {title}
                </Text>
            </ImageBackground>
        );
    } else {
        return (
                <View className="rounded-full w-[112px] h-[55px] items-center justify-center mt-4">
                    <Image
                        source={icon}
                        className="size-5"
                        tintColor="#A8B5DB"
                    />
                </View>
        );
    }
};
const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#0f0D23",
                    borderRadius: 50,
                    height: 52,
                    marginBottom: 36,
                    marginHorizontal: 20,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0F0D23",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title="Home"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title="Search"
                            // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.save}
                            title="Saved"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title="Profile"
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default _layout;
