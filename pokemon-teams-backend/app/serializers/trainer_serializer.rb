class TrainerSerializer
  # include FastJsonapi::ObjectSerializer
  # attributes  :name
  # has_many :pokemons
  
  attr_reader :data

  def initialize(trainer_data)
    @data = trainer_data
  end

  def to_serialized_json
    self.data.to_json(include: {
      pokemons: {except: [:created_at, :updated_at]}
      }, except:[:created_at, :updated_at])
    end

 end
