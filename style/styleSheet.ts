import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
  },
  addInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 3, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 30,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  completedItem: {
    backgroundColor: "#e6e6e6",
  },
  delete: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
});
