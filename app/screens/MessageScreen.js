import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";

const initMsg = [
  {
    id: 1,
    title: "T1",
    description:
      "D1dsdsddsdsdsdsdsssddddddddddddkfjdkfjksdjfkdsjkfjdskfjkdsfjkdsjfksjkfsd",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/mosh.jpg"),
  },
];

function MessageScreen(props) {
  const [messages, setMessages] = useState(initMsg);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // delete from array
    const newMessage = messages.filter((msg) => msg.id !== message.id);
    setMessages(newMessage);
    // delete from backend
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        key
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("selected")}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/mosh.jpg"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessageScreen;
