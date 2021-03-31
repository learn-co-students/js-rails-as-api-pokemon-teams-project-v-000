class TrainerSerializer

  def initialize(trainer_object)

    @trainer = trainer_object

  end


  def to_serialized_json

    # Commented code accomplishes same function as active code below:

    # @trainer.to_json(:include => {
    #   :pokemons => {:only => [:id, :species, :nickname, :trainer_id]}
    # }, :except => [:updated_at, :created_at])

    options = {
      include: {
        pokemons: {
          only: [:id, :species, :nickname, :trainer_id]
        }
      },
      except: [:updated_at, :created_at],
    }
    @trainer.to_json(options)

  end

end
