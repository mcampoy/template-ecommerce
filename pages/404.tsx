import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";

const Custom404Page = () => (
  <ShopLayout title={"Page Not Found"} pageDescription={"No hay nada que mostrar aquí"}>
    <Box
      display='flex'
      sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      justifyContent='center'
      alignItems='center'
      height='calc(100vh - 200px)'
    >
      <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}> 404 | </Typography>
      <Typography marginLeft={2}> No encontramos ningún artículo</Typography>
    </Box>
  </ShopLayout>
)

export default Custom404Page;