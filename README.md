# Dog Shop Desafio Ton

O app consiste de uma loja, os itens na loja são cachorros de diversas raças. Ao clicar sobre o item na loja, pode-se ver detalhes sobre o animal. Ao clicar adicionar o item é adicionado no carrinho onde de lá ou a partir da loja pode ser retirado. 

P.S.: A escolha da API foi pela comodidade de já estar disponivel e sem limite de uso para desenvolvimento;
 
## Rodar o projeto

Para rodar o projeto, o procedimento é o padrão: 
- Clone the project - `git clone https://github.com/lucaszsd/DesafioTon`.  
- Instalar as depencências - `yarn install`
- Rode com `yarn android`
 
 Também adicionei o APK para instalar no Android na seguinte pasta do [Google Drive](https://drive.google.com/drive/u/6/folders/1o5Bb02snnv5YAleNEc3n0sIMB8DfAEc9). Para instalar basta aceitar instalar aplicativos de fora da Google Play.
 
## Design

Para a consistencia do design, mantive usando a biblioteca de componentes [UI Kitten](https://akveo.github.io/react-native-ui-kitten/) que segue o Design System [Eva Design](https://eva.design/). Sobre o layout, foi mantido o mais simples, de acordo com o wireframe, adicionando somente uma tela extra.

Sobre possiveis melhorias adicionaria animações nas listagens, ao remover os itens do carrinho e também a opção de definir a quantidade de cada item. Outra melhoria que costumo utilizar é invés de "spinners" ao carregar, usar [Shimmer Placeholder](https://github.com/tomzaku/react-native-shimmer-placeholder), que mostram já um preview da interface a ser carregada.
   


## Tech Stuff

O projeto foi criado baseado no seguinte [boilerplate](https://github.com/shettayyy/React_Native_Seed)

Para o gerenciamento das ações dentro do app estou usando redux através do [Redux Toolkit](https://redux-toolkit.js.org/). Uma melhoria imediata seria persistir, que por agora, não está sendo feito. A cada vez que é carregado o app novamente, o carrinho está sendo perdido.

Desenvolvi usando emulador para Android, não tive como testar no iOS, então pode ter alguma incompatibilidade a ser resolvida para iPhone, como exemplo o ajuste do \

## Capturas de Tela

![Capturas de tela no Drive](https://github.com/lucaszsd/DesafioTon/blob/main/screenshots/Screenshot_1641848642.png)
![Capturas de tela no Drive](https://github.com/lucaszsd/DesafioTon/blob/main/screenshots/Screenshot_1641848647.png)
![Capturas de tela no Drive](https://github.com/lucaszsd/DesafioTon/blob/main/screenshots/Screenshot_1641848661.png)
![Capturas de tela no Drive](https://github.com/lucaszsd/DesafioTon/blob/main/screenshots/Screenshot_1641848667.png)
![Capturas de tela no Drive](https://github.com/lucaszsd/DesafioTon/blob/main/screenshots/Screenshot_1641848672.png)
![Capturas de tela no Drive](https://github.com/lucaszsd/DesafioTon/blob/main/screenshots/Screenshot_1641849758.png)
 
 

