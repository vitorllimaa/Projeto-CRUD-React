import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import ViewIcon from '@material-ui/icons/ViewWeek';
import Api from '../../services/api';
import moment from 'moment';
import api from "../../services/api";

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const Tasks: React.FC = () => {

    const [tasks, setTasks] = useState<ITask[]>([]);
    const history = useHistory();

    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {

        const response = await Api.get('/tasks');
        setTasks(response.data);
    }

    function formateDate(date: Date) {
        return moment(date).format("DD/MM/YYYY");
    }

    const handleClick = () => {
        console.info('You clicked the Chip.');
      };
    
    const handleDelete = () => {
    console.info('You clicked the delete icon.');
    };

    function newTask () {
        history.push('/tarefas_cadastro');
    }

    function editTask(id: number) {
        history.push(`/tarefas_cadastro/${id}`)
    }

    function viewTask(id: number) {
        history.push(`/tarefas/${id}`)
    }

    async function finishedTask(id: number) {
        await Api.patch(`/tasks/${id}`);
        loadTasks();
    }

    async function deleteTask(id: number) {
        await Api.delete(`/tasks/${id}`);
        loadTasks();
    }
    
    return (
        <div className='container'>
            <div className="header-content">
                <h1>Lista de Tarefas</h1> 
                <div className="register">
                    <Button variant="contained" onClick={newTask}>Cadastrar</Button>
                </div>      
            </div>
           <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Título</TableCell>
                        <TableCell align="center">Descrição</TableCell>
                        <TableCell align="center">Atualização</TableCell>
                        <TableCell align="center">Finalizada?</TableCell>
                        <TableCell align="center">Ações</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tasks.map((task) => (
                        <TableRow
                        key={task.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {task.id}
                        </TableCell>
                        <TableCell align="right">{task.title}</TableCell>
                        <TableCell align="right">{task.description}</TableCell>
                        <TableCell align="right">{formateDate(task.updated_at)}</TableCell>
                        <TableCell align="right"><Chip label={task.finished ? "Finalizado" : "Pendente"} color={task.finished ? "success" : "primary"} /></TableCell>
                        <TableCell align="right">
                            <Chip       
                            label="Editar"
                            color="warning"
                            disabled={task.finished}
                            onClick={() => editTask(task.id)}
                            onDelete={() => editTask(task.id)}
                            deleteIcon={<DoneIcon />}
                            />
                            <Chip
                            label="Deletar"
                            color="error"
                            onClick={() => deleteTask(task.id)}
                            deleteIcon={<DeleteIcon />}
                            />
                            <Chip
                            label="Finalizar"
                            color="success"
                            disabled={task.finished}
                            onClick={() => finishedTask(task.id)}
                            deleteIcon={<CheckIcon />}
                            />
                            <Chip
                            label="Visualizar"
                            color="info"
                            onClick={() => viewTask(task.id)}
                            onDelete={() => viewTask(task.id)}
                            deleteIcon={<ViewIcon />}
                            />
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Tasks;