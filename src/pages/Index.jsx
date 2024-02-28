import { useState } from "react";
import { VStack, HStack, Heading, Input, IconButton, useToast, Box, Text, StackDivider, useColorModeValue, Container } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddClick = () => {
    if (!inputValue.trim()) {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setTodos([...todos, { id: Date.now(), content: inputValue }]);
    setInputValue("");
  };

  const handleDeleteClick = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };

  return (
    <Container maxW="container.md" p={5}>
      <VStack spacing={4} align="stretch">
        <Heading mb={6}>Todo List</Heading>
        <HStack>
          <Input placeholder="Add a new task..." value={inputValue} onChange={handleInputChange} />
          <IconButton icon={<FaPlus />} isRound onClick={handleAddClick} aria-label="Add todo" />
        </HStack>
        <VStack divider={<StackDivider />} borderColor={useColorModeValue("gray.100", "gray.700")} borderWidth="2px" p={5} borderRadius="md" boxShadow="lg" spacing={4} align="stretch">
          {todos.map((todo) => (
            <HStack key={todo.id}>
              <Text flex={1}>{todo.content}</Text>
              <IconButton icon={<FaTrash />} isRound onClick={() => handleDeleteClick(todo.id)} aria-label="Delete todo" />
            </HStack>
          ))}
        </VStack>
        {todos.length === 0 && (
          <Box textAlign="center" my={5}>
            <Text fontSize="xl">No tasks found. Add a new task above!</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
