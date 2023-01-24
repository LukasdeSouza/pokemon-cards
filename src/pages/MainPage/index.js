import { ArrowBack, ArrowBackIos, ArrowForward, ArrowForwardIos, GitHub } from '@mui/icons-material'
import { Button, Chip, CircularProgress, IconButton, Link, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import PokemonController from '../../controller/PokemonController'
import RootStoreContext from '../../store/RootStore'
import { pokemonTypes } from '../../utils/constants'

const MainPage = observer(() => {

  const { pokemonStore } = useContext(RootStoreContext)
  const controller = new PokemonController(pokemonStore)

  let navigate = useNavigate()

  useEffect(() => {
    controller.fetchPokemon(pokemonStore.state.page)
  }, [])

  const pokemonList = pokemonStore.state.pokemon


  return (
    <Stack
      sx={{
        height: '100vh', width: '100vw'
      }}>
      {pokemonStore.state.pokemon.pokemon
        &&
        <Stack width={'100%'} height={'100%'}
          alignItems={'center'} justifyContent={'center'} margin={'0 auto'} textAlign={"center"} >
          <Stack padding={2} height={270} width={300}
            backgroundColor={'#EEEE'} borderRadius={2} border={'1px solid lightblue'}>
            <Typography variant='h6' color='primary' fontWeight={500}>
              {pokemonList.pokemon?.name.toUpperCase()}
            </Typography>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} padding={2}>
              <IconButton
                color='info'
                onClick={() => controller.fetchPokemon(pokemonStore.state.page--)}
                sx={{ marginRight: 1 }}>
                <ArrowBackIos />
              </IconButton>
              {pokemonStore.state.loading
                ?
                <Stack height={100}>
                  <CircularProgress size={'small'} color={'primary'} />
                </Stack>
                :
                <Stack height={100}>
                  <img src={pokemonStore.state.pokemon?.sprites?.front_default} />
                </Stack>
              }
              <IconButton
                color='info'
                onClick={() => controller.fetchPokemon(pokemonStore.state.page++)}
                sx={{ marginRight: 1 }}>
                <ArrowForwardIos />
              </IconButton>
            </Stack>
            <Stack spacing={1}>
              <Chip color='primary' label={`first type: ${pokemonList.types[0]?.type?.name}`} variant='outlined'
                sx={{ height: 40 }} />
              <Chip color='primary'
                label={`second-type: ${pokemonList.types[1]?.type?.name === undefined ? 'none' : pokemonList.types[1]?.type?.name}`} variant='outlined'
                sx={{ height: 40 }} />
              <Stack alignItems={'center'}>
                <Link href='https://github.com/LukasdeSouza' target={'_blank'}>
                  <GitHub color='primary' fontSize='18px' />
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      }
    </Stack>
  )
}
)
export default MainPage