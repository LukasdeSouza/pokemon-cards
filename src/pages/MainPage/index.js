import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Button, Chip, Stack, Typography } from '@mui/material'
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
        height: '300px', width: '250px', alignItems: 'center', margin: '0 auto',
        backgroundColor: '#ccc', borderRadius: 2, border: '1px solid black'
      }}>
      {pokemonStore.state.pokemon.pokemon
        &&
        <Stack padding={2} minHeight={50} height={'100%'}>
          <Typography variant='h6' fontWeight={700}>
            {pokemonList.pokemon?.name.toUpperCase()}
          </Typography>
          <img src={pokemonStore.state.pokemon?.sprites?.front_default} />
          <Chip color='primary' label={pokemonList.types[0]?.type?.name} size='small'
            sx={{
              backgroundColor: pokemonTypes.filter((e) =>
                e.key === pokemonList.types[0].type?.name
                  ?
                  `${e.color}`
                  :
                  '#bbbb')
            }}
          />
          <Chip color='primary' label={pokemonList.types[1]?.type?.name === ''} size='small' />
        </Stack>
      }
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} marginBottom={2}>
        <Button variant='outlined'
          color='info'
          onClick={() => controller.fetchPokemon(pokemonStore.state.page--)}
          sx={{ marginRight: 1 }}>
          <ArrowBack />
        </Button>
        <Button variant='outlined'
          color='info'
          onClick={() => controller.fetchPokemon(pokemonStore.state.page++)}
          sx={{ marginRight: 1 }}>
          <ArrowForward />
        </Button>
      </Stack>
    </Stack>
  )
}
)
export default MainPage