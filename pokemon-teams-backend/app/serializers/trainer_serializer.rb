class TrainerSerializer

  def options
    { 
      only: [:id, :name],
      include: {
        pokemons: {only: [:id, :species, :nickname, :trainer_id]}
      }

    }
  end

  def initialize(trainer, options={})
    @trainer = trainer
  end

  def to_serialized_json
    @trainer.to_json(self.options)
  end
end