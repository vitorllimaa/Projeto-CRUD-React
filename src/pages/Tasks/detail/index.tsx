import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Chip, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Api from '../../../services/api';
import moment from "moment";

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const TasksDetail: React.FC = () => {

   const history = useHistory();
   const { id } = useParams<{ id: string }>();
   const [task, setTask] = useState<ITask>();

   useEffect(() => {
       findTask();
   }, [id]);

   function back() {
       history.goBack();
   }

   async function findTask() {
       const response = await Api.get(`/tasks/${id}`);
       setTask(response.data)
   }


   function formateDate() {
        const dateCreated = task?.created_at
        return moment(dateCreated).format("DD/MM/YYYY");
   }

    function formateDateNow() {
        const dateUpdated = task?.updated_at
        return moment(dateUpdated).format("DD/MM/YYYY");
    }

   const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
   )
    return (
        <div className='container'>
            <div className="header-content">
                <h1>Lista de Tarefas</h1> 
                <div className="register">
                    <Button variant="contained" onClick={back}>Voltar</Button>
                </div>      
            </div>
            <Card sx={{ minWidth: 350 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                    {task?.title}
                    </Typography>
                    <Typography variant="body2">
                    {task?.description}
                    </Typography>
                    <br />
                    <Typography sx={{ mb: 1.9 }} color="text.secondary">
                    Data de início: { formateDate() }
                    </Typography>
                    <Typography sx={{ mb: 1.9 }} color="text.secondary">
                    Data de atualização: { formateDateNow()} 
                    </Typography>
                </CardContent>
                <CardActions>
                    <Chip label={task?.finished ? "Finalizado" : "Pendente"} color={task?.finished ? "success" : "warning"} />
                </CardActions>
            </Card>
        </div>
    );
}

export default TasksDetail;