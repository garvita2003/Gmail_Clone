import React, { Suspense } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import {Box} from '@mui/material';
import SuspenseLoader from "../components/common/SuspenseLoader";

const Main = () => {

    const [openDrawer, setOpenDrawer] = useState(true);

    const toogleDrawer = () => {
        setOpenDrawer(prevState => !prevState)
    }
    return (
        <>
            <Header toogleDrawer={toogleDrawer}/>
            <Box>
                <SideBar openDrawer={openDrawer}/>
                <Suspense fallback={<SuspenseLoader />}>
                    <Outlet context={{openDrawer}}/>
                </Suspense>
            </Box>
        </>
    )
}

export default Main;