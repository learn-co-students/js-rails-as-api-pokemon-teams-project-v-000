class Pokemon < ApplicationRecord
  belongs_to :trainer
  validates :nickname, :species, presence: true
  validate :team_size
  

  
private
  def initialize(attributes = nil)
    super
     self.nickname =Faker::Games::Pokemon.name 
    self.species =Faker::Games::Pokemon.name
  end

  def team_size
     if self.trainer.pokemons.size > TEAM_LIMIT
      errors[:base] << "Team Size Limit Reached, Release a Pokemon before Continuing"      
     end
  end
  

  
  
  


end
