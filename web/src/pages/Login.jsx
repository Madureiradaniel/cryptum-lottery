import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import usePlataforma from "../hooks/usePlataforma";
import { Carregando } from "../components/Carregando";

export const Login = ({ redirect }) => {
  let navigate = useNavigate();
  const { authLogin } = usePlataforma();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(redirect){
      navigate("/", { replace: true });
    }
  }, [redirect]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .required('Required Email')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const { email } = values
        await authLogin(email)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
          mt: 14
        }}
      >
        <Container maxWidth="sm" >
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Login
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h3"
              >
                Lottery
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Enter your email
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="E-mail"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={isLoading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sing In
              </Button>
            </Box>
          </form>
        </Container>
        <Carregando isLoading={isLoading} />
      </Box>
    </>
  );
}
