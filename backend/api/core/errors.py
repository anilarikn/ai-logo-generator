class JobNotFoundError(Exception):
    pass


class JobPersistenceError(Exception):
    pass


class StylePersistenceError(RuntimeError):
    pass