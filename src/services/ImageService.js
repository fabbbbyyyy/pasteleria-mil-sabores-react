import Papa from 'papaparse';

class ImageService {
    constructor() {
        this.imageMap = {};
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return Promise.resolve();
        
        return new Promise((resolve, reject) => {
            try {
                fetch('/datasets-tortas/cake_annotated.csv')
                    .then(response => response.text())
                    .then(csvText => {
                        Papa.parse(csvText, {
                            header: false,
                            skipEmptyLines: true,
                            complete: (results) => {
                                results.data.forEach(row => {
                                    if (row[0]) {
                                        const imageName = row[0];
                                        const productId = row[1];
                                        const categoryId = row[2];
                                        
                                        this.imageMap[`${productId}-${categoryId}`] = imageName;
                                    }
                                });
                                this.initialized = true;
                                resolve();
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Error cargando CSV:', error);
                        reject(error);
                    });
            } catch (error) {
                console.error('Error en initialize:', error);
                reject(error);
            }
        });
    }

    getImagePath(productId, categoryId) {
        const key = `${productId}-${categoryId}`;
        const imageName = this.imageMap[key];
        return imageName ? `/datasets-tortas/${imageName}` : null;
    }
}

export default new ImageService();