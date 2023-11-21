import { Stack, Button } from "@mui/material";

export const FilterButtonsQuestionamento = ({ filter, setFilter }) => {
  const buttons = [
    { label: "Pendentes", value: "Pendente" },
    { label: "Novas mensagens", value: "Aguardando" },
    { label: "Respondidos", value: "Respondido" },
  ];

  const getButtonVariant = (buttonValue) => (filter === buttonValue ? "contained" : "outlined");

  const handleFilter = (buttonValue) => {
    setFilter(buttonValue);
  };

  return (
    <Stack mb={2} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
      {buttons.map((button) => (
        <Button
          key={button.value}
          onClick={() => handleFilter(button.value)}
          variant={getButtonVariant(button.value)}
          size="small"
        >
          {button.label}
        </Button>
      ))}
    </Stack>
  );
};
