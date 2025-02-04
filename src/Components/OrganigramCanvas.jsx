import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Box, Button } from '@mui/material';

const OrganigramCanvas = ({ children }) => {
    return (
        <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={2}
            limitToBounds={false}
        >
            {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                    <Box sx={{ mb: 2 }}>
                        <Button onClick={() => zoomIn()}>Acercar</Button>
                        <Button onClick={() => zoomOut()}>Alejar</Button>
                        <Button onClick={() => resetTransform()}>Reiniciar</Button>
                    </Box>
                    <TransformComponent>
                        <Box
                            sx={{
                                width: '100%',
                                overflow: 'auto',
                            }}
                        >
                            {children}
                        </Box>
                    </TransformComponent>
                </>
            )}
        </TransformWrapper>
    );
};

export default OrganigramCanvas;