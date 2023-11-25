'use client'

import { Box, Heading, Image, Text, useColorModeValue, Container } from '@chakra-ui/react'
import Button from '../../components/ui/Button'
import GetDetailMovie from '../../utils/networks/GetDetailMovie';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';





const ArticleList = () => {

  const { id } = useParams()
  const [ movie, setMovie  ] = useState({})
  const [ genres, setGenres] = useState([])

  const url_image = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

  const getDetail = async(id) => {
      const data = await GetDetailMovie(id)
      await setMovie(data)
      await setGenres(data.genres)
  }

  useEffect(() => {
      getDetail(id)
  }, [id]);

  console.log(movie);


  return (
    <Container maxW={'7xl'} p="12">
      <Box
        marginTop={{ base: '1', sm: '2'  }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '20%' }}
            marginTop="2%">
            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image 
              height={'500px'}
                borderRadius="20px"
                src={
                 url_image
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Box>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)',
              )}

              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box maxW={'7xl'} p="10"
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0'}}>

          <Heading marginTop="0">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {movie.original_title}
            </Text>
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {movie.tagline}
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
            {movie.overview} <br />
          </Text> <br />
          {
            genres.map(
                function(item){
                    return(
                        <Text fontWeight={'bold'} fontSize={'20px'}>{item.name}</Text>
                    )
                }
            )
        } <br />
        <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
        {movie.release_date} <br /> <br /><Button variant="primary">Wacth</Button>
        </Text>
        
        </Box>
      </Box> 
    </Container>
  )
}

export default ArticleList