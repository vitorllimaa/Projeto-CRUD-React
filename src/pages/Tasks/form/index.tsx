import React, { useState, useEffect, ChangeEventHandler, ChangeEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Chip, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Api from '../../../services/api';

interface ITask {
    title: string;
    description: string;
}

const Tasks: React.FC = () => {
    
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const [model, setModel] = useState<ITask>({
        title: '',
        description: ''
    });

    useEffect(() => {
        if(id !== undefined){
            findTask();
        }
        
    }, [id]);

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if(id !== undefined) {
            const response = await Api.put(`/tasks/${id}`, model);
        }else{
            const response = await Api.post('/tasks', model);
        }
        back();
    }

    function back() {
        history.goBack();
    }

    async function findTask() {
        const response = await Api.get(`tasks/${id}`);
        setModel({
            title: response.data.title,
            description: response.data.description
        });
    }
    
    return (
        <div className='container'>
            <div className="header-content">
                <h1>Cadastro de Tarefa</h1> 
                <div className="register">
                    <Button variant="contained" onClick={back}>Voltar</Button>
            </div> 
        </div>    
            <section className="form-register">
                <form action="/" onSubmit={onSubmit}>
                    <TextField id="outlined-uncontrolled"
                        label="Título"
                        value={model.title}
                        name="title"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updatedModel(e)}
                    />   
                    <TextField id="outlined-uncontrolled"
                        label="Descrição"
                        multiline
                        rows={4}      
                        value={model.description}
                        name="description"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updatedModel(e)}
                    /> 
                    <Button variant="contained" type="submit">Cadastrar</Button>
                </form>
                
            </section>  
            </div>
    );
}

export default Tasks;