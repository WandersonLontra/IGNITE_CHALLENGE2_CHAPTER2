import { useEffect, useState } from 'react';

import api from '../../services/api';

import { FoodsContainer } from './styles';
import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

interface Foods {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
}

type NewFood = Omit<Foods,'id' | 'available'>

export function Dashboard(){
    const [foods,setFoods] = useState<Foods[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingFood, setEditingFood] = useState({} as Foods);


    useEffect( () => {
        async function getFoods() {

        
        const response : any = await api.get('/foods');

        setFoods(response.data);
        }

        getFoods();
    },[]);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const handleAddFood = async (food : NewFood) => {
    
        try {
          const response = await api.post('/foods', {
            ...food,
            available: true,
          });
    
          setFoods([...foods, response.data]);
    

        } catch (err) {
          console.log(err);
        }
    }

    const handleUpdateFood = async (food : NewFood) => {
    
        try {
          const foodUpdated = await api.put(
            `/foods/${editingFood.id}`,
            { ...editingFood, ...food },
          );
    
          const foodsUpdated = foods.map(f =>
            f.id !== foodUpdated.data.id ? f : foodUpdated.data,
          );
          setFoods(foodsUpdated);

        } catch (err) {
          console.log(err);
        }
    }

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    }

    const handleEditFood = (food : Foods) => {
        setEditingFood(food);
        setEditModalOpen(true);
    }
    
    const handleDeleteFood = async (id: number) => {
    
        await api.delete(`/foods/${id}`);
    
        const foodsFiltered = foods.filter(food => food.id !== id);
    
        setFoods(foodsFiltered);
    }

    return (
        <>
          <Header openModal={toggleModal} />
          <ModalAddFood
            isOpen={modalOpen}
            setIsOpen={toggleModal}
            handleAddFood={handleAddFood}
          />
          <ModalEditFood
            isOpen={editModalOpen}
            setIsOpen={toggleEditModal}
            editingFood={editingFood}
            handleUpdateFood={handleUpdateFood}
          />
  
          <FoodsContainer data-testid="foods-list">
            {foods &&
              foods.map(food => (
                <Food
                  key={food.id}
                  food={food}
                  handleDelete={handleDeleteFood}
                  handleEditFood={handleEditFood}
                />
              ))}
          </FoodsContainer>
        </>
      );
}