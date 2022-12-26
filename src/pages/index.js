// React
import React, { useEffect, useState } from "react";
// Tools
import styled from "styled-components";
import readXlsxFile from 'read-excel-file'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`

const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 200px
`

const IndexPage = () => {

  const [file, setFile] = useState(null);
  const [arrayTab, setArrayTab] = useState([])

  const tabToSelect = ["CUISINE", "RANGEMENT", "E. M. R. T. V.", "LIBRE SERVICE"]

  const handleFile = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }

  //Use readXlsxFile to read the file and parse it in a json format tree
  useEffect(() => {
    if (file) {
      let arrayIndex = []
      let arrayTab = []
      readXlsxFile(file, { sheet: 1 }).then((rows) => {
        rows.map((row, index) => {
          tabToSelect.map((tab) => {
            if (row[0] == tab) {
              arrayIndex.push(index)
            }
          })
        })
          console.log('arrayTab', arrayIndex)
        if (arrayIndex.length == 4) {
          arrayTab.push(rows.slice(arrayIndex[0], arrayIndex[1]))
          arrayTab.push(rows.slice(arrayIndex[2], arrayIndex[3]))
          setArrayTab(arrayTab);
        }
      })
    }
  }, [file])

  return (
    <Main> 
      <input type="file" id="formId" onChange={(e) => handleFile(e)}/>
      <Container>
        <ChildContainer>
          <Table>
            <Row>
              <Cell>Nom</Cell>
              <Cell>CA</Cell>
              <Cell>CA n-1</Cell>
              <Cell>chépa</Cell>
            </Row>
            {arrayTab[0] && arrayTab[0].map((row, index) => {
              return (
                <Row key={index}>
                  <Cell>{row[0]}</Cell>
                  <Cell>{row[1]}</Cell>
                  <Cell>{row[2]}</Cell>
                  <Cell>{row[3]}</Cell>
                </Row>
              )
            })}
          </Table>
        </ChildContainer>
        <ChildContainer>
          <Table>
            <Row>
              <Cell>Nom</Cell>
              <Cell>CA</Cell>
              <Cell>CA n-1</Cell>
              <Cell>chépa</Cell>
            </Row>
            {arrayTab[1] && arrayTab[1].map((row, index) => {
              return ( 
                <Row key={index}>
                  <Cell>{row[0]}</Cell>
                  <Cell>{row[1]}</Cell>
                  <Cell>{row[2]}</Cell>
                  <Cell>{row[3]}</Cell>
                </Row>
              )
            })}
          </Table>
        </ChildContainer>
      </Container>
    </Main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
