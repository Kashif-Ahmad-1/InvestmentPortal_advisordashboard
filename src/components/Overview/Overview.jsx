import { Box, Grid, GridItem, Button, ButtonGroup, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { DataContext } from "../../context/data.context"
import Balance from "../Charts/Balance"
import PieChart from "../Charts/PieChart"
import BreakingNews from "../News/BreakingNews"
import StockDetails from "../Stocks/StocksComponents/StockDetails"
import StockTable from "../Stocks/StocksComponents/StockTable"
import styles from "./Overview.module.css"
import './Flipping.css'

function Overview() {
    const { trendingStocks } = useContext(DataContext)
    const cardsData = [
        { title: "Card 1", content: "Content for card 1" },
        { title: "Card 2", content: "Content for card 2" },
        { title: "Card 3", content: "Content for card 3" },
        { title: "Card 4", content: "Content for card 4" },
         
    ];

    const handleFlip = (index) => {

    }
    return (
        <>
            <Grid className={styles.manGrid} >
                <GridItem className={styles.leftGrid}>
                    <StockDetails w='100%' title='Stock of the Week' symbol2={'IBM'} />
                    <StockTable w='100%' h='400px' data={trendingStocks} type='trending' title='Trending Stocks' />
                </GridItem>
                <GridItem className={styles.rightGrid}>
                    {/* <Box display='flex' gap='20px'>
                        <Balance />
                        <PieChart />
                    </Box> */}
                    <BreakingNews h='840px' />
                </GridItem>
            </Grid>
            <br />

            <h1>Most Rated Plans</h1>

            {/* <SimpleGrid columns={[1, 2, 4]} spacing='60px' marginTop='20px' >
                {cardsData.map((card, index) => (
                    <Box key={index} p={20} shadow='md' borderWidth='2px' background='white'>
                        <Text fontSize='xl'>{card.title}</Text>
                        <Text mt={4}>{card.content}</Text>
                    </Box>
                ))}
            </SimpleGrid> */}


            <SimpleGrid columns={[1, 2, 4]} spacing="60px" marginTop='20px'>
                {cardsData.map((card, index) => (
                    <Box key={index}   onClick={() => handleFlip(index)} className="flip-card" w='300px'>
                        <Box className="flip-card-inner">
                            <Box borderWidth='2px' className="flip-card-front">
                                <Text fontSize='xl'>{card.title}</Text>
                            </Box>
                            <Box className="flip-card-back">
                                <Text mt={4}>{card.content}</Text>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>

            <br />
            <h1>Most Sold Plans</h1>
            <SimpleGrid columns={[1, 2, 4]} spacing="60px" marginTop='20px'>
                {cardsData.map((card, index) => (
                    <Box key={index}   onClick={() => handleFlip(index)} className="flip-card" w='300px'>
                        <Box className="flip-card-inner">
                            <Box borderWidth='2px' className="flip-card-front">
                                <Text fontSize='xl'>{card.title}</Text>
                                
                            </Box>
                            <Box className="flip-card-back">
                                <Text mt={4}>{card.content}</Text>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>

        </>
    )
}

export default Overview