import { createRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Input } from '../Input';
import { Modal } from '../Modal';

interface FoodsFormat {
    name: string;
    description: string;
    price: string;
    image: string;
}

interface ModalEditFoodProps {
    isOpen: boolean;
    setIsOpen: () => void;
    handleUpdateFood: (food: FoodsFormat) => void;
    editingFood: FoodsFormat;
}


export function ModalEditFood({isOpen, setIsOpen,handleUpdateFood, editingFood} : ModalEditFoodProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');


    const handleSubmit = async () => {

        const data = {
            name: !!editingFood && name === '' ? editingFood.name : name,
            description: !!editingFood && description === '' ? editingFood.description : description,
            price: !!editingFood && price === '' ? editingFood.price : price,
            image: !!editingFood && image === '' ? editingFood.image : image
        }

        await handleUpdateFood(data);

        setName('');
        setDescription('');
        setPrice('');
        setImage('');

        setIsOpen();
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <Form ref={createRef()} onSubmit={handleSubmit} initialData={editingFood}>
            <h1>Editar Prato</h1>
            <Input 
                name="image" 
                placeholder="Cole o link aqui" 
                onChange={event => setImage(event.target.value)}             
            />

            <Input 
                name="name" 
                placeholder="Ex: Moda Italiana" 
                onChange={event => setName(event.target.value)} 
            />
            <Input 
                name="price" 
                placeholder="Ex: 19.90" 
                onChange={event => setPrice(event.target.value)} 
            />

            <Input 
                name="description" 
                placeholder="Descrição" 
                onChange={event => setDescription(event.target.value)} 
            />

            <button type="submit" data-testid="edit-food-button">
              <div className="text">Editar Prato</div>
              <div className="icon">
                <FiCheckSquare size={24} />
              </div>
            </button>
          </Form>
        </Modal>
      );
}
