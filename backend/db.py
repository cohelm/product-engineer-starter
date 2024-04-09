class DB:
  """
  lame implementation of an in-memory db. Not optimized for space
  will store records in a dict for random access, and clone a copy 
  in a list for fast pagination
  """
  def __init__(self):
    """ constructor """
    self.dct = {}
    self.list = []

  def length(self):
    """ return the total number of records in the db """
    return len(self.list)

  def put(self, id: str, rec):
    """ add a record against an id """
    self.dct[id] = rec;
    self.list.append(rec);

  def get(self, id):
    """ read a record by id """
    try:
      return self.dct[id]
    except:
      return None
    
  def paginate(self, page: int = 1, size: int = 20):
    """ return a paginated list of items """
    print(f"paginate on: page => {page}, size => {size}")
    if(page < 1): page = 1
    if(size < 0): size = 0

    start = (page - 1) * size
    end = start + size
    return self.list[start: end]