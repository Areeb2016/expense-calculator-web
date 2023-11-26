"use client";
import {
  Box,
  Card,
  CardBody,
  ChakraProvider,
  Flex,
  IconButton,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
  Badge,
  Grid,
  GridItem,
  CardFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { format } from "date-fns";
import api from "../utils/api";

const Expense = () => {
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const toast = useToast();

  const [expenseData, setExpenseData] = useState({
    name: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [updatedExpenseData, setUpdatedExpenseData] = useState({
    name: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState([]);

  const openExpenseModal = () => {
    onOpenAdd();
  };

  const openExpenseModalEdit = (expenseData) => {
    setCurrentExpense(expenseData);
    setUpdatedExpenseData(expenseData);
    console.log("expense", expenseData);
    onOpenEdit();
  };

  const openExpenseModalDelete = (expenseData) => {
    setCurrentExpense(expenseData);
    onOpenDelete();
  };

  const handleInputChangeEdit = (e) => {
    const { name, value } = e.target;
    setUpdatedExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addExpense = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const body = {
      ...expenseData,
      user: userData?.userId,
    };
    try {
      const response = await api.create(body);
      if (response.success) {
        onCloseAdd();
        toast({
          title: "Success",
          description: response.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error.",
          description: response.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      getExpenses();
    } catch (error) {
      toast({
        title: "Error.",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const editExpense = async (id) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const body = {
      ...updatedExpenseData,
      user: userData?.userId,
    };
    try {
      const response = await api.update(id, body);
      if (response.success || response?.data?.success) {
        onCloseEdit();
        toast({
          title: "Success",
          description: response.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getExpenses();
      } else {
        toast({
          title: "Error.",
          description: response.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {}
  };

  const deleteExpense = async (id) => {
    console.log(id);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const body = {
      user: userData?.userId,
    };
    console.log("body", body);
    try {
      const response = await api.delete(id, body);
      console.log(response);
      if (response.success || response?.data?.success) {
        onCloseDelete();
        toast({
          title: "Success",
          description: response.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        getExpenses();
      } else {
        toast({
          title: "Error.",
          description: response.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle the error as needed
      //   toast({
      //     title: "Error.",
      //     description: error,
      //     status: "error",
      //     duration: 3000,
      //     isClosable: true,
      //   });
    }
  };

  const getExpenses = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData?.userId) {
      try {
        const response = await api.read(userData?.userId);
        if (response) {
          setExpenses(response);
        }
      } catch (error) {
        toast({
          title: "Error.",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <section className="flex min-h-screen flex-col items-center justify-between md:p-24 base:p-8">
      <ChakraProvider>
        <Text fontSize="4xl" className="md:py-4 base:py-8">
          My Expenses
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap="8"
        >
          {expenses.length > 0 && expenses ? (
            expenses.map((expense) => (
              <GridItem key={expense._id} colSpan={1} height={"100%"}>
                <Box
                  as={Card}
                  bg="#FFFFFF"
                  color="black"
                  _hover={{ transform: "scaleY(1.05)" }}
                  transition="transform 0.3s ease-in-out"
                  height={"100%"}
                  className="flex flex-col"
                  boxShadow={"0 4px 8px rgba(0, 0, 0, 0.1)"}
                >
                  <CardBody>
                    <Text fontSize="xl" fontWeight="bold" mb="2">
                      {expense?.name}
                    </Text>
                    <Badge
                      variant="solid"
                      bg="#00cc99"
                      mb="2"
                      py={"2"}
                      px={"2"}
                    >
                      Created At:{" "}
                      {format(new Date(expense?.date), "MMMM dd, yyyy")}
                    </Badge>
                    <Text fontSize="md" mb="2">
                      Amount: ${expense?.amount}
                    </Text>
                    <Text fontSize="md" mb="2">
                      Description: {expense?.description}
                    </Text>
                    <Badge
                      variant="solid"
                      bg="#00cc99"
                      mb="2"
                      py={"2"}
                      px={"2"}
                    >
                      {expense?.category}
                    </Badge>
                  </CardBody>
                  <CardFooter>
                    <Flex
                      width="100%"
                      justifyContent={"flex-end"}
                      alignItems={"flex-end"}
                      gap={"4"}
                    >
                      <IconButton
                        icon={<MdEdit />}
                        bg={"#00cc99"}
                        color="white"
                        borderRadius="full"
                        size="lg"
                        cursor={"pointer"}
                        onClick={() => openExpenseModalEdit(expense)}
                      />
                      <IconButton
                        icon={<MdDeleteOutline />}
                        bg={"#00cc99"}
                        color="white"
                        borderRadius="full"
                        size="lg"
                        cursor={"pointer"}
                        onClick={() => openExpenseModalDelete(expense)}
                      />
                    </Flex>
                  </CardFooter>
                </Box>
              </GridItem>
            ))
          ) : (
            <GridItem colSpan={12}>
              <Box
                as={Card}
                bg="#FFFFFF"
                color="black"
                _hover={{ transform: "scaleY(1.1)" }}
                transition="transform 0.3s ease-in-out"
              >
                <CardBody>
                  <Text>No Data.</Text>
                </CardBody>
              </Box>
            </GridItem>
          )}
        </Grid>
        <IconButton
          icon={<FaPlus />}
          aria-label="Scroll to Top"
          position="fixed"
          bottom="4"
          right="4"
          bg={"#00cc99"}
          color="white"
          borderRadius="full"
          size="lg"
          onClick={openExpenseModal}
        />
        <Modal isOpen={isOpenAdd} onClose={onCloseAdd} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Expense</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={expenseData.name}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type="number"
                    name="amount"
                    value={expenseData.amount}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="category"
                    value={expenseData.category}
                    onChange={handleInputChange}
                  >
                    <option defaultValue="food">Food</option>
                    <option value="transportation">Transportation</option>
                    <option value="medication">Medication</option>
                    <option value="house-utilities">House Utilities</option>
                    <option value="entertainment">Entertainment</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={expenseData.description}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    name="date"
                    value={expenseData.date}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button bg="#00cc99" color="#ffffff" onClick={addExpense}>
                Add Expense
              </Button>
              <Button variant="ghost" onClick={onCloseAdd}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpenEdit} onClose={onCloseEdit} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Expense</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={updatedExpenseData.name}
                    onChange={handleInputChangeEdit}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type="number"
                    name="amount"
                    value={updatedExpenseData.amount}
                    onChange={handleInputChangeEdit}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="category"
                    value={updatedExpenseData.category}
                    onChange={handleInputChangeEdit}
                  >
                    <option defaultValue="food">Food</option>
                    <option value="transportation">Transportation</option>
                    <option value="medication">Medication</option>
                    <option value="house-utilities">House Utilities</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={updatedExpenseData.description}
                    onChange={handleInputChangeEdit}
                  />
                </FormControl>
                {updatedExpenseData.date ? (
                  <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      name="date"
                      value={format(
                        new Date(updatedExpenseData.date),
                        "yyyy-MM-dd"
                      )}
                      onChange={handleInputChangeEdit}
                    />
                  </FormControl>
                ) : (
                  <></>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                bg="#00cc99"
                color="#ffffff"
                onClick={() => editExpense(currentExpense?._id)}
              >
                Edit Expense
              </Button>
              <Button variant="ghost" onClick={onCloseEdit}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpenDelete} onClose={onCloseDelete} size="sm">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Expense</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to delete this expense?</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => deleteExpense(currentExpense?._id)}
              >
                Delete
              </Button>
              <Button variant="ghost" onClick={onCloseDelete}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </section>
  );
};

export default Expense;
