type Props = {
  params: { 
    id: string; 
  }

  searchParams: {
    genre: string;
  };
};

function GenrePage({params: { id }, searchParams: { genre }}: Props) {
    return (
    <div>
      <h1>Welcome to genre ID :{id} and name: {genre}</h1>
    </div>
  );
}

export default GenrePage;
